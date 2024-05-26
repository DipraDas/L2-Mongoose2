import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err))
    }
}

const getAllStudents = catchAsync(async (req, res, next) => {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Student data retrieved successfully',
        data: result
    })
})

const getSingleStudent = catchAsync(async (req, res, next) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student data retrieved successfully',
        data: result
    })
})

const deleteStudent = catchAsync(async (req, res, next) => {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student data retrieved successfully',
        data: result
    })
})

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent
}


// const createStudent = async (req: Request, res: Response) => {
//     try {
//         const student = req.body.student;
//         // const { error } = studentValidationSchema.validate(student);
//         const zodparsedData = studentValidationSchema.parse(student);
//         const result = await StudentServices.createStudentIntoDB(zodparsedData);

//         // Joi
//         // if (error) {
//         //     res.status(500).json({
//         //         success: false,
//         //         message: 'Something went wrong',
//         //         error: error.details
//         //     })
//         // }

//         // Zod



//         res.status(200).json({
//             success: true,
//             message: 'Student is created successfully',
//             data: result
//         })
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: 'Something went wrong',
//             error: err
//         })
//     }
// } 