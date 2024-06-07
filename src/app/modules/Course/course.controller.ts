import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(
        req.body
    );

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course created successfully",
        data: result,
    });
});

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.updateCourseIntoDB(
        id,
        req.body
    );

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course updated successfully",
        data: result,
    });
});

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Courses retrived successfully",
        data: result,
    });
});

const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result =
        await CourseServices.getSingleCourseFromDB(id);

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Courses retrived successfully",
        data: result,
    });
});

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result =
        await CourseServices.deleteCourseFromDB(id);

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Courses retrived successfully",
        data: result,
    });
});

const assignFaculties = catchAsync(async (req, res) => {

    const { courseId } = req.params;
    const { faculties } = req.body;

    const result =
        await CourseServices.assignFacultiesWithCourseIntoDB(courseId, faculties);

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Assign faculties to course successfully.",
        data: result,
    });
});

const removeFaculties = catchAsync(async (req, res) => {

    const { courseId } = req.params;
    const { faculties } = req.body;

    const result = await CourseServices.removeFacultiesFromCourseIntoDB(courseId, faculties);

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Remove faculty from course successfully.",
        data: result,
    });
});

export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFaculties,
    removeFaculties
};

