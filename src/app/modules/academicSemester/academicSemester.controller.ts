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

const getAllAcademicSemester = catchAsync(async (req, res) => {
    const result = await academicSemesterServices.getAllAcademicSemesterFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Academic semester retrived successfully",
        data: result,
    });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;

    const result =
        await academicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester retrived successfully",
        data: result,
    });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
        semesterId,
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
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateAcademicSemester
}