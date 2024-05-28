import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
    const lastStudentId = await User.findOne(
        {
            role: "student",
        },
        {
            id: 1,
            _id: 0,
        }
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastStudentId?.id ? parseInt(lastStudentId.id.slice(-4)) : 0;
};

export const generateStudentId = async (payload: IAcademicSemester) => {
    const currentId = await findLastStudentId();

    const uniqueId = (currentId + 1).toString().padStart(4, "0");
    const studentId = `${payload.year}${payload.code}${uniqueId}`;
    return studentId;
};