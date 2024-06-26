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

// restrict duplicate semester entry
AcademicSemesterSchema.pre("save", async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name,
    });

    if (isSemesterExists) {
        throw new Error("Semester already exsists");
    }
    next();
});

export const AcademicSemester = model<IAcademicSemester>(
    "AcademicSemester",
    AcademicSemesterSchema
);