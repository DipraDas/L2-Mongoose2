import { TACademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TACademicDepartment) => {
    const result = AcademicDepartment.create(payload);
    return result;
};
const updateAcademicDepartmentIntoDB = async (
    id: string,
    payload: Partial<TACademicDepartment>
) => {
    const result = AcademicDepartment.findByIdAndUpdate(id, payload, {
        new: true,
    });

    if (!result) {
        throw new Error(`Academic Department with ID ${id} not found`);
    }

    return result;
};

const getAllAcademicDepartmentFromDB = async () => {
    const result = AcademicDepartment.find({});
    return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = AcademicDepartment.findById(id);
    return result;
};

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    updateAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
};