import { Student } from "./student.interface";
import { StudentModel } from "./student.model";

const createStudentIntoDB = async (student: Student) => {
    const result = await StudentModel.create(student);
    console.log('result--', result);
    return result;
}

export const StudentServices = {
    createStudentIntoDB
}