import { z } from "zod";

const userNameValidationSchema = z.object({
    firstName: z
        .string()
        .trim()
        .max(20, "FirstName cannot be more than 20 characters")
        .regex(/^[A-Z][a-zA-Z]*$/, {
            message: "First name is not in capitalize format",
        })
        .min(1, "Firstname is required"),
    middleName: z.string().optional(),
    lastName: z
        .string()
        .trim()
        .regex(/^[a-zA-Z]+$/, {
            message: "Last name is not valid",
        })
        .min(1, "Lastname is required"),
});

const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, "Father's name is required"),
    fatherOccupation: z.string().min(1, "Father's occupation is required"),
    fatherContactNo: z.string().min(1, "Father's contact number is required"),
    motherName: z.string().min(1, "Mother's name is required"),
    motherOccupation: z.string().min(1, "Mother's occupation is required"),
    motherContactNo: z.string().min(1, "Mother's contact number is required"),
});

const localGuardianValidationSchema = z.object({
    name: z.string().min(1, "Local guardian's name is required"),
    occupation: z.string().min(1, "Local guardian's occupation is required"),
    contactNo: z.string().min(1, "Local guardian's contact number is required"),
    address: z.string().min(1, "Local guardian's address is required"),
    relation: z.string().min(1, "Relation with local guardian is required"),
});

export const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema.refine((value) => !!value, {
                message: "Student Name is required",
            }),
            gender: z.enum(["male", "female"], {
                errorMap: () => ({ message: "The gender field must be male or female" }),
            }),
            dateOfBirth: z.date().optional(),
            contactNo: z.string().min(1, "Contact number is required"),
            emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
            email: z
                .string()
                .email({ message: "Email is not valid" })
                .min(1, "Email is required"),
            bloodGroup: z
                .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
                .optional(),
            presentAddress: z.string().min(1, "Present address is required"),
            permanentAdress: z.string().min(1, "Permanent address is required"),
            guardian: guardianValidationSchema.refine((value) => !!value, {
                message: "Guardian information is required",
            }),
            localGuardian: localGuardianValidationSchema.refine((value) => !!value, {
                message: "Local guardian information is required",
            }),
            profileImage: z.string().optional()
        })
    })
});

export const studentValidations = {
    createStudentValidationSchema
};