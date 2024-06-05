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
        isDeleted: z.boolean().optional(),
        preRequisiteCourses: z.array(PreRequisiteCoursesValidationSchema).optional(),
    })
})

const updateCourseValidationSchema = createCourseValitionScrema.partial();

export const CourseValidation = {
    createCourseValitionScrema,
    updateCourseValidationSchema
}