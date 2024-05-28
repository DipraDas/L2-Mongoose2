import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
        req.body
    );

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty created successfully",
        data: result,
    });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
        facultyId,
        req.body
    );

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty updated successfully",
        data: result,
    });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Academic faculty retrived successfully",
        data: result,
    });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;

    const result =
        await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty retrived successfully",
        data: result,
    });
});

export const AcademicFacultyController = {
    createAcademicFaculty,
    updateAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
};