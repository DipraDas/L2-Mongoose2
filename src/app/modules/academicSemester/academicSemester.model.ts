import { Schema, model } from "mongoose";
import { IAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonth } from "./academicSemester.interface";

const months: TMonth[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const AcademicSemesterName: TAcademicSemesterName[] = [
    'Autumn', 'Summar', 'Fall'
]

const AcademicSemesterCode: TAcademicSemesterCode[] = [
    '01', '02', '03'
]

const academicSemesterSchema = new Schema<IAcademicSemester>({
    name: {
        type: String,
        enum: AcademicSemesterName,
        required: true
    },
    code: {
        type: String,
        enum: AcademicSemesterCode,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    startMonth: {
        type: String,
        enum: months,
        required: true
    },
    endMonth: {
        type: String,
        enum: months,
        required: true
    }
}, {
    timestamps: true
});

export const AcademicSemesterModel = model<IAcademicSemester>('AcademicSemester', academicSemesterSchema);
