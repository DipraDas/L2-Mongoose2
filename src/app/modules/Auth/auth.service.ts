import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

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

    const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
        expiresIn: '1d'
    })

    return {
        accessToken,
        needsPasswordChange: user?.needsPasswordChange
    }
}

const changePassword = (user: { userId: string; role: string }, payload) => {
    const result = await User.findOneAndUpdate({
        id: user.userId,
        role: user.role
    })
}

export const AuthServices = {
    loginUser,
    changePassword
}