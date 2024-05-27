import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createAcademicSemester = catchAsync(async (req, res) => {
    // const { student: studentData, password } = req.body;
    // const result = await UserServices.createStudentIntoDB(password, studentData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester created successfully',
        data: result
    })
})

export const AcademicSemesterControllers = {
    createAcademicSemester
}