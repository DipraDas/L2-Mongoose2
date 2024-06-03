import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Student data retrieved successfully',
        data: result
    })
})

const getSingleStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student data retrieved successfully',
        data: result
    })
})

const updateSingleStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { student } = req.body;
    const result = await StudentServices.updateSingleStudentIntoDB(
        id,
        student
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student data updated successfully",
        data: result,
    });
});


const deleteStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);
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
    deleteStudent,
    updateSingleStudent
}