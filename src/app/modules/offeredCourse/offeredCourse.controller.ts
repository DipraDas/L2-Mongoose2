import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OfferedCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(
        req.body
    );

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "New offered course created successfully",
        data: result,
    });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
        id,
        req.body
    );

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Offered course updated successfully",
        data: result,
    });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
    const result =
        await OfferedCourseServices.getAllOfferedCourseFromDB(
            req.query
        );

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Offered course retrived succesfully",
        data: result,
    });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
        await OfferedCourseServices.getSingleOfferedCourseFromDB(id);

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single offered course is retrived succesfully",
        data: result,
    });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result =
        await OfferedCourseServices.deleteOfferedCourseFromDB(id);

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Offered course deleted successfully",
        data: result,
    });
});

export const OfferedCourseController = {
    createOfferedCourse,
    updateOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    deleteOfferedCourse
};

