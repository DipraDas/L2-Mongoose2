import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { SemesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
        req.body
    );

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester registered successfully",
        data: result,
    });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
        id,
        req.body
    );

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester Registration updated successfully",
        data: result,
    });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
    const result =
        await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
            req.query
        );

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Registered semester retrived succesfully",
        data: result,
    });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
        await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Registered semester is retrived succesfully",
        data: result,
    });
});

const deleteSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result =
        await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(id);

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Courses retrived successfully",
        data: result,
    });
});

export const SemesterRegistrationController = {
    getAllSemesterRegistration,
    createSemesterRegistration,
    updateSemesterRegistration,
    getSingleSemesterRegistration,
    deleteSemesterRegistration
};

