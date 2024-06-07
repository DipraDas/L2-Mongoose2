import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { TSemesterRegistration } from "./semesterRegistration.interface";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

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