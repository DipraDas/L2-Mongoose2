import { academicSemesterNameCodeMapper } from "./academicSemester.constants";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
    // check the name code coordination
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("The semester code is incorrect!");
    }

    const result = AcademicSemester.create(payload);
    return result;
};

const getAllAcademicSemesterFromDB = async () => {
    const result = AcademicSemester.find({});
    return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = AcademicSemester.findById({ id });
    return result;
};

const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<IAcademicSemester>
) => {
    // check the name code coordination
    if (
        payload.name &&
        payload.code &&
        academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
        throw new Error("The semester code is incorrect!");
    }

    const result = AcademicSemester.findByIdAndUpdate(id, payload, {
        new: true,
    });

    if (!result) {
        throw new Error(`Academic semester with ID ${id} not found`);
    }

    return result;
};

export const academicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
};