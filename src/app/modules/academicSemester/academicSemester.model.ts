import { Schema, model } from "mongoose";
import {
    AcademicSemesterCode,
    AcademicSemesterName,
    Months,
} from "./academicSemester.constants";
import { IAcademicSemester } from "./academicSemester.interface";

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
    {
        name: { type: String, enum: AcademicSemesterName, required: true },
        code: { type: String, enum: AcademicSemesterCode, required: true },
        year: { type: String, required: true },
        startMonth: { type: String, enum: Months, required: true },
        endMonth: { type: String, enum: Months, required: true },
    },
    {
        timestamps: true,
    }
);

export const AcademicSemester = model<IAcademicSemester>(
    "AcademicSemester",
    AcademicSemesterSchema
);