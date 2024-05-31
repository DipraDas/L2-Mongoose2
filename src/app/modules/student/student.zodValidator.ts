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
            dateOfBirth: z.string().optional(),
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
            profileImage: z.string().optional(),
            admissionSemester: z.string()
        })
    })
});



const updateUserNameValidationSchema = z.object({
    firstName: z
        .string()
        .trim()
        .max(20, "FirstName cannot be more than 20 characters")
        .regex(/^[A-Z][a-zA-Z]*$/, {
            message: "First name is not in capitalize format",
        })
        .min(1, "Firstname is required")
        .optional(),
    middleName: z.string().optional(),
    lastName: z
        .string()
        .trim()
        .regex(/^[a-zA-Z]+$/, {
            message: "Last name is not valid",
        })
        .min(1, "Lastname is required")
        .optional(),
});

const updateGuardianValidationSchema = z.object({
    fatherName: z.string().min(1, "Father's name is required").optional(),
    fatherOccupation: z
        .string()
        .min(1, "Father's occupation is required")
        .optional(),
    fatherContactNo: z
        .string()
        .min(1, "Father's contact number is required")
        .optional(),
    motherName: z.string().min(1, "Mother's name is required").optional(),
    motherOccupation: z
        .string()
        .min(1, "Mother's occupation is required")
        .optional(),
    motherContactNo: z
        .string()
        .min(1, "Mother's contact number is required")
        .optional(),
});

const updateLocalGuardianValidationSchema = z.object({
    name: z.string().min(1, "Local guardian's name is required").optional(),
    occupation: z
        .string()
        .min(1, "Local guardian's occupation is required")
        .optional(),
    contactNo: z
        .string()
        .min(1, "Local guardian's contact number is required")
        .optional(),
    address: z.string().min(1, "Local guardian's address is required").optional(),
    relation: z
        .string()
        .min(1, "Relation with local guardian is required")
        .optional(),
});

const updateStudentValidationSchema = z.object({
    body: z.object({
        student: z.object({
            name: updateUserNameValidationSchema
                .refine((value) => !!value, {
                    message: "Student Name is required",
                })
                .optional(),
            // password: z.string().min(8, "Password can not be less then 8 charecters").optional(),
            gender: z
                .enum(["male", "female"], {
                    errorMap: () => ({
                        message: "The gender field must be male or female",
                    }),
                })
                .optional(),
            dateOfBirth: z.string().min(1, "Date of birth is required").optional(),
            contactNo: z.string().min(1, "Contact number is required").optional(),
            emergencyContactNo: z
                .string()
                .min(1, "Emergency contact number is required")
                .optional(),
            email: z
                .string()
                .email({ message: "Email is not valid" })
                .min(1, "Email is required")
                .optional(),
            bloodGroup: z
                .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
                .optional()
                .optional(),
            presentAddress: z
                .string()
                .min(1, "Present address is required")
                .optional(),
            permanentAddress: z
                .string()
                .min(1, "Permanent address is required")
                .optional(),
            guardian: updateGuardianValidationSchema
                .refine((value) => !!value, {
                    message: "Guardian information is required",
                })
                .optional(),
            localGuardian: updateLocalGuardianValidationSchema
                .refine((value) => !!value, {
                    message: "Local guardian information is required",
                })
                .optional(),
            admissionSemester: z.string().optional(),
            academicDepartment: z.string().optional(),
            profileImage: z.string().optional(),
            // isActive: z
            //   .enum(["active", "blocked"], {
            //     errorMap: () => ({
            //       message: "Student status can either be active or blocked",
            //     }),
            //   })
            //   .refine((value) => !!value, {
            //     message: "Student status is required",
            //   }),
            // isDeleted: z.boolean()
        }),
    }),
});

export const studentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema
};