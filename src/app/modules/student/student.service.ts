import { TStudent } from "./student.interface";
import { Student } from "./student.model";



const getAllStudentsFromDB = async () => {
    const result = await Student.find();
    return result;
};

const getSingleStudentFromDB = async (studentId: string) => {
    // const result = await Student.findOne({ id: studentId });

    const result = await Student.aggregate([
        { $match: { id: studentId } }
    ])
    return result;
};

const deleteStudentFromDB = async (studentId: string) => {
    const result = await Student.updateOne(
        { id: studentId },
        { isDeleted: true }
    );
    return result;
};


export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB
}