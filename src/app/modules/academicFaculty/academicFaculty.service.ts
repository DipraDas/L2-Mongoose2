import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const result = AcademicFaculty.create(payload);
    return result;
};
const updateAcademicFacultyIntoDB = async (
    id: string,
    payload: Partial<TAcademicFaculty>
) => {
    const result = AcademicFaculty.findByIdAndUpdate(id, payload, {
        new: true,
    });

    if (!result) {
        throw new Error(`Academic Faculty with ID ${id} not found`);
    }

    return result;
};

const getAllAcademicFacultyFromDB = async () => {
    const result = AcademicFaculty.find({});
    return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = AcademicFaculty.findById(id);
    return result;
};

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    updateAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB,
};