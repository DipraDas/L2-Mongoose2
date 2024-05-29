import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Name must be of type string",
            required_error: "Name is required",
        }),
        academicFaculty: z.string({
            invalid_type_error: "Academic reference must be of string type",
            required_error: "Academic Department is required",
        }),
    }),
});

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z
            .string({
                invalid_type_error: "Name must be of type string",
                required_error: "Name is required",
            })
            .optional(),
        academicFaculty: z
            .string({
                invalid_type_error: "Academic reference must be of string type",
                required_error: "Academic Department is required",
            })
            .optional(),
    }),
});

export const AcademicDepartmentValidations = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
};