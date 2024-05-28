import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utiils";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
    // if (await Student.isStudentExists(studentData.id)) {
    //   throw new Error("User id already existss");
    // }
    const userData: Partial<TUser> = {};

    // set user password
    userData.password = password || (config.default_pass as string);

    // set student role
    userData.role = "student";

    const academicSemesterData = await AcademicSemester.findById(
        studentData.admissionSemester
    );

    if (!academicSemesterData) {
        throw new Error("Academic semester not found");
    }

    // set student id
    userData.id = await generateStudentId(academicSemesterData);

    // create user
    const newUser = await User.create(userData); //builtin static method

    if (Object.keys(newUser).length) {
        // set student id
        studentData.id = newUser.id;
        studentData.user = newUser._id;

        const newStudent = await Student.create(studentData);

        return newStudent;
    }
};








export const UserServices = {
    createStudentIntoDB
}