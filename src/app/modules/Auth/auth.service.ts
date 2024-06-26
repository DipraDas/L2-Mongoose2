import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from 'bcrypt';
import { createToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";

const loginUser = async (payload: TLoginUser) => {

    const user = await User.isUserExistsByCustomId(payload.id);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found.')
    }

    // checking if the user is already deleted? 
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted.')
    }

    // Checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked.')
    }

    if (!await User.isPasswordMatched(payload?.password, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password not matched')
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role
    }

    const accessToken = createToken(
        jwtPayload,
        config.jwt_secret as string,
        config.jwt_access_expires_in as string
    )

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string
    )

    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user?.needsPasswordChange
    }
}

const refreshToken = async (token: string) => {

    const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;

    const { userId, iat } = decoded;

    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found.')
    }

    // checking if the user is already deleted? 
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted.')
    }

    // Checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked.')
    }

    if (
        user.passwordChangedAt
        &&
        User.isJWTIssuedBeforePasswordChanged(
            user.passwordChangedAt,
            iat as number
        )) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized hi!!'
        )
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role
    }

    const accessToken = createToken(
        jwtPayload,
        config.jwt_secret as string,
        config.jwt_access_expires_in as string
    )
    return {
        accessToken
    }
}

const changePassword = async (userData: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {

    const user = await User.isUserExistsByCustomId(userData.userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found.')
    }

    // checking if the user is already deleted? 
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted.')
    }

    // Checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked.')
    }

    if (!await User.isPasswordMatched(payload.oldPassword, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password not matched')
    }

    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_salt_rounds)
    )

    await User.findOneAndUpdate({
        id: userData.userId,
        role: userData.role
    },
        {
            password: newHashedPassword,
            needsPasswordChange: false,
            passwordChangedAt: new Date()
        }
    )

    return null;
}

const forgetPassword = async (userId: string) => {

    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found.')
    }

    // checking if the user is already deleted? 
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted.')
    }

    // Checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked.')
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role
    }

    const resetToken = createToken(
        jwtPayload,
        config.jwt_secret as string,
        '10m'
    )

    const resetUiLink = `http://localhost:3000?id=${user.id}&token=${resetToken}`
    console.log(resetUiLink);

    sendEmail(user.email, resetUiLink);
}

const resetPassword = async (
    payload: {
        id: string,
        newPassword: string
    },
    token: string
) => {

    const user = await User.isUserExistsByCustomId(payload.id);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found.')
    }

    // checking if the user is already deleted? 
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted.')
    }

    // Checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked.')
    }
    const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

    if (payload.id !== decoded.userId) {
        throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden.')
    }

    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_salt_rounds)
    )

    await User.findOneAndUpdate({
        id: decoded.userId,
        role: decoded.role
    },
        {
            password: newHashedPassword,
            needsPasswordChange: false,
            passwordChangedAt: new Date()
        }
    )
}

export const AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}