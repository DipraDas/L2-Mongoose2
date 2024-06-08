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

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        faculty
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

    const result = await OfferedCourse.create({ ...payload, academicSemester });
    return result;

}

const getAllOfferedCourseFromDB = async (
    query: Record<string, unknown>
) => {

    // const result = getAllSemesterReOfferedCoursegistrationQuery.modelQuery;
    // return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
    // const result =
    //     await SemesterRegistration.findById(id).populate("academicSemester");
    // return result;
};


const updateOfferedCourseIntoDB = async (
    id: string,
    payload: Partial<TOfferedCourse>
) => {

};

const deleteOfferedCourseFromDB = async (id: string) => {

}

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
    deleteOfferedCourseFromDB
}