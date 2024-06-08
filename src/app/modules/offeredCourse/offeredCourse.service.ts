import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
    const result = await OfferedCourse.create(payload);
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