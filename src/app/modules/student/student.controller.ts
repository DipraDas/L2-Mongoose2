import { Request, Response } from "express";
import Joi from 'joi';
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.zodValidator";
// import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
    try {
        const student = req.body.student;
        // const { error } = studentValidationSchema.validate(student);
        const zodparsedData = studentValidationSchema.parse(student);
        const result = await StudentServices.createStudentIntoDB(zodparsedData);

        // Joi
        // if (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: 'Something went wrong',
        //         error: error.details
        //     })
        // }

        // Zod 



        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
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