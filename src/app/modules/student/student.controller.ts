import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const student = req.body.student;
        const result = await StudentServices.createStudentIntoDB(student);
        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result
        })
    } catch (err) {
        console.log(err);
    }
}

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        res.status(200).json({
            success: true,
            message: "All Student data retrieved successfully",
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
};

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);

        res.status(200).json({
            success: true,
            message: "Student data retrieved successfully",
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
};

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent
}