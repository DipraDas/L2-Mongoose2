import { Student } from "./student.model";

const getAllStudentsFromDB = async () => {
    const result = await Student.find()
        .populate("admissionSemester")
        // .populate("academicDepartment")
        .populate({
            path: "academicDepartment",
            populate: {
                path: "academicFaculty",
            },
        });
    return result;
};

const getSingleStudentFromDB = async (studentId: string) => {
    // const result = await Student.findOne({ id: studentId });

    // const result = await Student.aggregate([
    //     { $match: { id: studentId } }
    // ])

    const result = await Student.findById(studentId)
        .populate("admissionSemester")
        .populate({
            path: "academicDepartment",
            populate: {
                path: "academicFaculty",
            },
        });;
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