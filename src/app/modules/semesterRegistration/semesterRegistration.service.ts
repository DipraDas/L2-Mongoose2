import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { SemesterRegistration } from "./semesterRegistration.model";
import { RegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

    const academicSemester = payload.academicSemester;

    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
        $or: [
            {
                status: RegistrationStatus.UPCOMING,
            },
            {
                status: RegistrationStatus.ONGOING,
            },
        ],
    });

    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} registered semester.`
        )
    }

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

const getAllSemesterRegistrationFromDB = async (
    query: Record<string, unknown>
) => {
    const getAllSemesterRegistrationQuery = new QueryBuilder(
        SemesterRegistration.find().populate("academicSemester"),
        query
    )
        .filter()
        .paginate()
        .sort()
        .fields();

    const result = getAllSemesterRegistrationQuery.modelQuery;
    return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
    const result =
        await SemesterRegistration.findById(id).populate("academicSemester");
    return result;
};


const updateSemesterRegistrationIntoDB = async (
    id: string,
    payload: Partial<TSemesterRegistration>
) => {

    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
    if (!isSemesterRegistrationExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'This Semester Registration not found.'
        )
    }

    const currentSemesterStatus = isSemesterRegistrationExists?.status;
    const requesteredStatus = payload.status;

    if (currentSemesterStatus === RegistrationStatus.ENDED) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `This semester is already Ended.`
        )
    }

    // UPCOMING --> ONGOING --> ENDED
    if (
        currentSemesterStatus === RegistrationStatus.UPCOMING
        &&
        requesteredStatus === RegistrationStatus.ENDED) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `You can not directly change status from ${currentSemesterStatus} to ${requesteredStatus}`
        )
    }
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