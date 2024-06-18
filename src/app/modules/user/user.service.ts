import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/appError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utiils";
import mongoose from "mongoose";
import { TFaculty } from "../Faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../Faculty/faculty.model";
import { Admin } from "../Admin/admin.model";
import { verifyToken } from "../Auth/auth.utils";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    const userData: Partial<TUser> = {};

    // set user password
    userData.password = password || (config.default_pass as string);

    // set student role
    userData.role = "student";
    userData.email = studentData.email;

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);

    //set student role
    userData.role = 'faculty';
    userData.email = payload.email;
    // find academic department info

    const academicDepartment = await AcademicDepartment.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session }); // array

        //create a faculty
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a faculty (transaction-2)

        const newFaculty = await Faculty.create([payload], { session });

        if (!newFaculty.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);

    //set student role
    userData.role = 'admin';
    userData.email = payload.email;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateAdminId();

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session });

        //create a admin
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a admin (transaction-2)
        const newAdmin = await Admin.create([payload], { session });

        if (!newAdmin.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

const getMe = async (userId: string, role: string) => {

    let result = null;

    if (role === 'student') {
        result = await Student.findOne({ id: userId }).populate('user');
    }

    if (role === 'admin') {
        result = await Admin.findOne({ id: userId }).populate('user');
    }

    if (role === 'faculty') {
        result = await Faculty.findOne({ id: userId }).populate('user');
    }

    return result;

}

const changeStatus = async (id: string, payload: { status: string }) => {

    const result = await User.findByIdAndUpdate(
        id,
        payload,
        {
            new: true
        }
    )
    console.log(result);
    return result;
}

export const UserServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
    getMe,
    changeStatus
}