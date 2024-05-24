import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
    // const result = await StudentModel.create(student);

    const student = new Student(studentData);

    if (await student.isUserExists(studentData.id)) {
        throw new Error('User Already Exists');
    }

    const result = await student.save();

    return result;
}

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
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB
}