import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {

    const isUserExists = await User.findOne({ id: payload?.id });
    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'THis user is not found.')
    }

    // checking if the user is already deleted? 
    const isDeleted = isUserExists?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted.')
    }

    // Checking if the user is blocked

    const userStatus = isUserExists?.status;
    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked.')
    }

    const isPasswordMatched = await bcrypt.compare(
        payload?.password,
        isUserExists?.password
    )

    console.log(isPasswordMatched);

    return {}
}

export const AuthServices = {
    loginUser
}