import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicSemester.service";
import sendResponse from "../../utils/sendResponse";

const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await academicSemesterServices.createAcademicSemesterIntoDB(
        req.body
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester created successfully",
        data: result,
    });
});


export const AcademicSemesterControllers = {
    createAcademicSemester
}