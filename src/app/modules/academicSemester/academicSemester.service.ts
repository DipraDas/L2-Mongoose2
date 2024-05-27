import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
    const result = AcademicSemester.create(payload);
    return result;
};

export const academicSemesterServices = {
    createAcademicSemesterIntoDB,
};