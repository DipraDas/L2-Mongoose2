import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/queryBuilder";
import { studentSearchableFields } from "./student.constant";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {


    const studentQuery = new QueryBuilder(Student.find(), query)
        .search(studentSearchableFields)
        .sort()
        .paginate()
        .fields();

    const result = await studentQuery.modelQuery;
    return result;

    //{email :{$regex : query.searchTerm, $options: i}}

    // const queryObj = { ...query };

    // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

    // let searchTerm = '';

    // if (query?.searchTerm) {
    //     searchTerm = query?.searchTerm as string;
    // }

    // const searchQuery = Student.find({
    //     $or: studentSearchableFields.map((field) => ({
    //         [field]: { $regex: searchTerm, $options: 'i' }
    //     }))
    // })

    // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    // excludeFields.forEach(el => delete queryObj[el]);

    // const filterQuery = searchQuery
    //     .find(queryObj)
    //     .populate("admissionSemester")
    //     .populate({
    //         path: "academicDepartment",
    //         populate: {
    //             path: "academicFaculty",
    //         },
    //     });

    // let sort = '-createdAt';

    // if (query.sort) {
    //     sort = query.sort as string
    // }

    // const sortQuery = filterQuery.sort(sort);

    // let page = 1;
    // let limit = 1;
    // let skip = 0;

    // if (query.limit) {
    //     limit = Number(query.limit);
    // }

    // if (query.page) {
    //     page = Number(query.page);
    //     skip = (page - 1) * limit;
    // }

    // const paginateQuery = sortQuery.skip(skip);
    // const limitQuery = paginateQuery.limit(limit);

    // let fields = '-__v';

    // if (query.fields) {
    //     fields = (query.fields as string).split(',').join(' ');
    // }

    // const fieldQuery = await limitQuery.select(fields);

    // return fieldQuery;

};


const updateSingleStudentIntoDB = async (
    studentId: string,
    payload: Partial<TStudent>
) => {
    // const result = await Student.findOne({ id: studentId });

    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdateData: Record<string, unknown> = {
        ...remainingStudentData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdateData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdateData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdateData[`localGuardian.${key}`] = value;
        }
    }
    console.log(modifiedUpdateData);
    const result = await Student.findOneAndUpdate(
        { id: studentId },
        modifiedUpdateData,
        {
            new: true,
            runValidators: true
        }
    );
    return result;
};


const getSingleStudentFromDB = async (studentId: string) => {
    // const result = await Student.findOne({ id: studentId });

    // const result = await Student.aggregate([
    //     { $match: { id: studentId } }
    // ])

    const result = await Student.findOne({ studentId })
        .populate("admissionSemester")
        .populate({
            path: "academicDepartment",
            populate: {
                path: "academicFaculty",
            },
        });;
    return result;
};

const deleteStudentFromDB = async (studentId: string) => {
    // if (!(await Student.isStudentExists(studentId))) {
    //     throw new Error("User does not existss");
    // }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedStudent = await Student.updateOne(
            { id: studentId },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, "Error deletin Student");
        }
        const deletedUser = await User.updateOne(
            { id: studentId },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "Error deletin User");
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedUser;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
    }
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateSingleStudentIntoDB
}