import { Schema, model } from "mongoose";
import { TACademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/appError";

const AcademicDepartmentSchema = new Schema<TACademicDepartment>(
    {
        name: { type: String, required: true, unique: true },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: "AcademicFaculty",
        },
    },
    {
        timestamps: true,
    }
);

AcademicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDepartment.findOne({
        name: this.name
    });
    // if (isDepartmentExist) {
    //     throw new Error('This department is already exists.')
    // }
    next();
})

AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isDepartmentExist = await AcademicDepartment.findOne(query);
    if (!isDepartmentExist) {
        throw new AppError(404, 'This department does not exist!!')
    }
    next();
})

export const AcademicDepartment = model<TACademicDepartment>(
    "AcademicDepartment",
    AcademicDepartmentSchema
);