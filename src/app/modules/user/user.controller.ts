import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/appError";

const createStudent = catchAsync(async (req, res) => {
    const { student: studentData, password } = req.body;
    const result = await UserServices.createStudentIntoDB(password, studentData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created successfully',
        data: result
    })
})
const createFaculty = catchAsync(async (req, res) => {
    const { faculty: facultyData, password } = req.body;
    const result = await UserServices.createFacultyIntoDB(password, facultyData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is created successfully',
        data: result
    })
})

const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;

    const result = await UserServices.createAdminIntoDB(password, adminData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
    });
});

const getMe = catchAsync(async (req, res) => {

    const token = req.headers.authorization;

    if (!token) {
        throw new AppError(httpStatus.NOT_FOUND, 'Token not found')
    }

    const result = await UserServices.getMe(token);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User data fetched successfully.',
        data: result,
    });
});

export const UserControllers = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe
}