import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import hasTimeConflict from "./offeredCourse.utils";

// !!!!!!!!!  Create course  !!!!!!!!!!!!!!!!! //
const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        section,
        faculty,
        days,
        startTime,
        endTime
    } = payload;

    const isSemesterRegistrationExists =
        await SemesterRegistration.findById(semesterRegistration);

    if (!isSemesterRegistrationExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Semester Registration not found.'
        )
    }

    const academicSemester = isSemesterRegistrationExists.academicSemester;

    const isAcademicFacultyExists =
        await AcademicFaculty.findById(academicFaculty);

    if (!isAcademicFacultyExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Academic Faculty not found.'
        )
    }
    const isAcademicDepartmentExists =
        await AcademicDepartment.findById(academicDepartment);

    if (!isAcademicDepartmentExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Academic department not found.'
        )
    }
    const isCourseExists =
        await Course.findById(course);

    if (!isCourseExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Course not found.'
        )
    }
    const isFacultyExists =
        await Faculty.findById(faculty);

    if (!isFacultyExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Faculty not found.'
        )
    }

    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        _id: academicDepartment,
        academicFaculty
    })

    if (!isDepartmentBelongToFaculty) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`
        )
    }

    // Check if the same offered course same section in same  regestered semester exists!!!

    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
        await OfferedCourse.findOne({
            semesterRegistration,
            course,
            section
        })

    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Offered course with same section is already exists.'
        )
    }

    // Get the schedules of the faculties
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime')

    const newSchedule = {
        days,
        startTime,
        endTime
    }

    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(
            httpStatus.CONFLICT,
            'This faculty is not available at that time | Choose other time or date.'
        )
    }

    const result = await OfferedCourse.create({ ...payload, academicSemester });
    return result;

}

// !!!!!!!!!  Get all course  !!!!!!!!!!!!!!!!! //
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
    const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await offeredCourseQuery.modelQuery;
    return result;
};

// !!!!!!!!!  Get single course  !!!!!!!!!!!!!!!!! //
const getSingleOfferedCourseFromDB = async (id: string) => {
    const offeredCourse = await OfferedCourse.findById(id);

    if (!offeredCourse) {
        throw new AppError(404, 'Offered Course not found');
    }

    return offeredCourse;
};

// !!!!!!!!!  Update Course  !!!!!!!!!!!!!!!!! //
const updateOfferedCourseIntoDB = async (
    id: string,
    payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
    /**
     * Step 1: check if the offered course exists
     * Step 2: check if the faculty exists
     * Step 3: check if the semester registration status is upcoming
     * Step 4: check if the faculty is available at that time. If not then throw error
     * Step 5: update the offered course
     */
    const { faculty, days, startTime, endTime } = payload;

    const isOfferedCourseExists = await OfferedCourse.findById(id);

    if (!isOfferedCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
    }

    const isFacultyExists = await Faculty.findById(faculty);

    if (!isFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
    }

    const semesterRegistration = isOfferedCourseExists.semesterRegistration;
    // get the schedules of the faculties

    // Checking the status of the semester registration
    const semesterRegistrationStatus =
        await SemesterRegistration.findById(semesterRegistration);

    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
        );
    }

    // check if the faculty is available at that time.
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');

    const newSchedule = {
        days,
        startTime,
        endTime,
    };

    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(
            httpStatus.CONFLICT,
            `This faculty is not available at that time ! Choose other time or day`,
        );
    }

    const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

// !!!!!!!!!  Delete  course  !!!!!!!!!!!!!!!!! //
const deleteOfferedCourseFromDB = async (id: string) => {
    /**
     * Step 1: check if the offered course exists
     * Step 2: check if the semester registration status is upcoming
     * Step 3: delete the offered course
     */
    const isOfferedCourseExists = await OfferedCourse.findById(id);

    if (!isOfferedCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
    }

    const semesterRegistation = isOfferedCourseExists.semesterRegistration;

    const semesterRegistrationStatus =
        await SemesterRegistration.findById(semesterRegistation).select('status');

    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
        );
    }

    const result = await OfferedCourse.findByIdAndDelete(id);

    return result;
};

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
    deleteOfferedCourseFromDB
}