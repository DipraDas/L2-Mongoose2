import { Request, Response } from "express";
import Joi from 'joi';
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
    try {
        const student = req.body.student;
        const userNameValidationSchema = Joi.object({
            firstName: Joi.string()
                .max(20)
                .required()
                .trim()
                .pattern(/^[A-Z][a-zA-Z]*$/, 'capitalized format')
                .messages({
                    'string.base': 'First Name must be a string',
                    'string.empty': 'First Name is required',
                    'string.max': 'First Name cannot be more than 20 characters',
                    'string.pattern.name': 'First Name is not in capitalized format',
                    'any.required': 'First Name is required'
                }),
            middleName: Joi.string()
                .max(20)
                .trim()
                .optional()
                .messages({
                    'string.base': 'Middle Name must be a string',
                    'string.max': 'Middle Name cannot be more than 20 characters'
                }),
            lastName: Joi.string()
                .max(20)
                .required()
                .trim()
                .pattern(/^[a-zA-Z]*$/, 'alpha characters only')
                .messages({
                    'string.base': 'Last Name must be a string',
                    'string.empty': 'Last Name is required',
                    'string.max': 'Last Name cannot be more than 20 characters',
                    'string.pattern.name': 'Last Name is not valid',
                    'any.required': 'Last Name is required'
                })
        });

        const guardianValidationSchema = Joi.object({
            fatherName: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Father\'s Name must be a string',
                    'string.empty': 'Father\'s Name is required',
                    'any.required': 'Father\'s Name is required'
                }),
            fatherOccupation: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Father\'s Occupation must be a string',
                    'string.empty': 'Father\'s Occupation is required',
                    'any.required': 'Father\'s Occupation is required'
                }),
            fatherContactNo: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Father\'s Contact Number must be a string',
                    'string.empty': 'Father\'s Contact Number is required',
                    'any.required': 'Father\'s Contact Number is required'
                }),
            motherName: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Mother\'s Name must be a string',
                    'string.empty': 'Mother\'s Name is required',
                    'any.required': 'Mother\'s Name is required'
                }),
            motherOccupation: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Mother\'s Occupation must be a string',
                    'string.empty': 'Mother\'s Occupation is required',
                    'any.required': 'Mother\'s Occupation is required'
                }),
            motherContactNo: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Mother\'s Contact Number must be a string',
                    'string.empty': 'Mother\'s Contact Number is required',
                    'any.required': 'Mother\'s Contact Number is required'
                })
        });

        const localGuardianValidationSchema = Joi.object({
            name: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Local Guardian\'s Name must be a string',
                    'string.empty': 'Local Guardian\'s Name is required',
                    'any.required': 'Local Guardian\'s Name is required'
                }),
            occupation: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Local Guardian\'s Occupation must be a string',
                    'string.empty': 'Local Guardian\'s Occupation is required',
                    'any.required': 'Local Guardian\'s Occupation is required'
                }),
            contactNo: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Local Guardian\'s Contact Number must be a string',
                    'string.empty': 'Local Guardian\'s Contact Number is required',
                    'any.required': 'Local Guardian\'s Contact Number is required'
                }),
            address: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Local Guardian\'s Address must be a string',
                    'string.empty': 'Local Guardian\'s Address is required',
                    'any.required': 'Local Guardian\'s Address is required'
                }),
            relation: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Relation to Local Guardian must be a string',
                    'string.empty': 'Relation to Local Guardian is required',
                    'any.required': 'Relation to Local Guardian is required'
                })
        });

        const studentValidationSchema = Joi.object({
            id: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Student ID must be a string',
                    'string.empty': 'Student ID is required',
                    'any.required': 'Student ID is required'
                }),
            name: userNameValidationSchema
                .required()
                .messages({
                    'any.required': 'Student\'s Name is required'
                }),
            gender: Joi.string()
                .valid("male", "female", "other")
                .required()
                .trim()
                .messages({
                    'string.base': 'Gender must be a string',
                    'any.only': '{#value} is not valid',
                    'string.empty': 'Gender is required',
                    'any.required': 'Gender is required'
                }),
            dateOfBirth: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Date of Birth must be a string',
                    'string.empty': 'Date of Birth is required',
                    'any.required': 'Date of Birth is required'
                }),
            contactNo: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Contact Number must be a string',
                    'string.empty': 'Contact Number is required',
                    'any.required': 'Contact Number is required'
                }),
            emergencyContactNo: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Emergency Contact Number must be a string',
                    'string.empty': 'Emergency Contact Number is required',
                    'any.required': 'Emergency Contact Number is required'
                }),
            email: Joi.string()
                .required()
                .trim()
                .email()
                .messages({
                    'string.base': 'Email must be a string',
                    'string.empty': 'Email is required',
                    'string.email': '{#value} is not a valid email type',
                    'any.required': 'Email is required'
                }),
            bloodGroup: Joi.string()
                .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
                .trim()
                .messages({
                    'string.base': 'Blood Group must be a string',
                    'any.only': '{#value} is not valid'
                }),
            presentAddress: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Present Address must be a string',
                    'string.empty': 'Present Address is required',
                    'any.required': 'Present Address is required'
                }),
            permanentAddress: Joi.string()
                .required()
                .trim()
                .messages({
                    'string.base': 'Permanent Address must be a string',
                    'string.empty': 'Permanent Address is required',
                    'any.required': 'Permanent Address is required'
                }),
            guardian: guardianValidationSchema
                .required()
                .messages({
                    'any.required': 'Guardian details are required'
                }),
            localGuardian: localGuardianValidationSchema
                .required()
                .messages({
                    'any.required': 'Local Guardian details are required'
                }),
            profileImg: Joi.string()
                .trim()
                .optional()
                .messages({
                    'string.base': 'Profile Image URL must be a string'
                }),
            isActive: Joi.string()
                .valid("active", "blocked")
                .default('active')
                .trim()
                .messages({
                    'string.base': 'Status must be a string',
                    'any.only': '{#value} is not valid'
                })
        });

        const result = await StudentServices.createStudentIntoDB(student);
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