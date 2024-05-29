
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
    const result =
        await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department created successfully",
        data: result,
    });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result =
        await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
            departmentId,
            req.body
        );

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department updated successfully",
        data: result,
    });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
    const result =
        await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Academic Department retrived successfully",
        data: result,
    });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;

    const result =
        await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
            departmentId
        );

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department retrived successfully",
        data: result,
    });
});

export const AcademicDepartmentController = {
    createAcademicDepartment,
    updateAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
};