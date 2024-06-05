import { z } from "zod";

const PreRequisiteCoursesValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})

const createCourseValitionScrema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        preRequisiteCourses: z.array(PreRequisiteCoursesValidationSchema).optional(),
    })
})

const PreRequisiteUpdateoursesValidationSchema = z.object({
    course: z.string().optional(),
    isDeleted: z.boolean().optional(),
})

const updateCourseValitionScrema = z.object({
    body: z.object({
        title: z.string().optional(),
        prefix: z.string().optional(),
        code: z.number().optional(),
        credits: z.number().optional(),
        preRequisiteCourses: z.array(PreRequisiteUpdateoursesValidationSchema).optional(),
    })
})

export const CourseValidation = {
    createCourseValitionScrema,
    updateCourseValitionScrema
}