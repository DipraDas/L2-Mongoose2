import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successful.',
        data: result
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

export const AuthControllers = {
    loginUser,
    changePassword
}