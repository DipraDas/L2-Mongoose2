import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { student: studentData, password } = req.body;
        const result = await UserServices.createStudentIntoDB(password, studentData);

        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result
        })
    } catch (err) {
        // res.status(500).json({
        //     success: false,
        //     message: 'Something went wrong',
        //     error: err
        // })
        next(err);
    }
}

export const UserControllers = {
    createStudent
}