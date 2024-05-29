import { z } from "zod";

const AcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Name must be of type string",
        }),
    }),
});

export const AcademicFacultyValidation = {
    AcademicFacultyValidationSchema,
};