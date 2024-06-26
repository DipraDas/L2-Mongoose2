import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);

    const { refreshToken, accessToken, needsPasswordChange } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successful.',
        data: {
            accessToken,
            needsPasswordChange
        }
    })
})

const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;
    await AuthServices.changePassword(req.user, passwordData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User password id updated successful.',
        data: null
    })
})

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access token is retrived successful.',
        data: result
    })
})

const forgetPassword = catchAsync(async (req, res) => {
    const userId = req.body.id
    const result = await AuthServices.forgetPassword(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reset link is generated successfully',
        data: result
    })
})

const resetPassword = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const result = await AuthServices.resetPassword(req.body, token as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password reset successfully.',
        data: result
    })
})


export const AuthControllers = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}