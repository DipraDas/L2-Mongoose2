import { Schema, model } from "mongoose";
import { TACademicDepartment } from "./academicDepartment.interface";

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

export const AcademicDepartment = model<TACademicDepartment>(
    "AcademicDepartment",
    AcademicDepartmentSchema
);