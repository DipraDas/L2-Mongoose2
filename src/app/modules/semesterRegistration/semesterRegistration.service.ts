import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {


    const academicSemester = payload.academicSemester;

    // check if semester is exists?
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'This academic semester not found.'
        )
    }

    // check if the semster is already registered.
    const isSemesterRegistrationExists = await SemesterRegistration.findOne({ academicSemester });
    if (isSemesterRegistrationExists) {
        throw new AppError(
            httpStatus.CONFLICT,
            'This semester is already exists.'
        )
    }

    const result = await SemesterRegistration.create(payload);
    return result;

}

const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {

}

const getSingleSemesterRegistrationFromDB = async (id: string) => {

}

const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {

};

const deleteSemesterRegistrationFromDB = async (id: string) => {

}

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB,
    deleteSemesterRegistrationFromDB
}