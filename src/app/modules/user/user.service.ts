import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TNewUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    const user: TNewUser = {}

    user.password = password || (config.default_pass as string)

    user.role = 'student'
    user.id = '2024973987'

    const result = await User.create(user);

    if (Object.keys(result).length) {
        // set id, _id as user
        studentData.id = result.id;
        studentData.user = result._id
    }

    return result;
}

export const UserServices = {
    createStudentIntoDB
}