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

export const StudentControllers = {
    createStudent
}