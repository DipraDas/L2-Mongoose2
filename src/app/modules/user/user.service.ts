import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/appError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utiils";
import mongoose from "mongoose";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    const userData: Partial<TUser> = {};

    // set user password
    userData.password = password || (config.default_pass as string);

    // set student role
    userData.role = "student";

    const academicSemesterData = await AcademicSemester.findById(
        studentData.admissionSemester
    );

    if (!academicSemesterData) {
        throw new AppError(httpStatus.NOT_FOUND, "Academic semester not found");
    }

    // start the transaction session
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        // set student id
        userData.id = await generateStudentId(academicSemesterData);

        // create user
        const newUser = await User.create([userData], { session }); //builtin static method

        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create new user");
        }

        if (newUser.length) {
            // set student id
            studentData.id = newUser[0].id;
            studentData.user = newUser[0]._id;

            const newStudent = await Student.create([studentData], { session });

            if (!newStudent.length) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    "Failed to create new student"
                );
            }

            await session.commitTransaction();
            await session.endSession();

            return newStudent;
        }
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error)
    }

    // for creatin instance
    // const student = new Student(studentData);
    // if (await student.isStudentExists(studentData.id)) {
    //   throw new Error("User id already exists");
    // }

    // const result = await student.save();
};

export const UserServices = {
    createStudentIntoDB
}