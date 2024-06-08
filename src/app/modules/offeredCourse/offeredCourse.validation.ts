import { z } from "zod";
import { Days } from "./offeredCourse.constant";

export const createOfferedCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string(),
        academicFaculty: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        faculty: z.string(),
        maxCapacity: z.number(),
        section: z.number(),
        days: z.array(z.enum([...Days] as [string, ...string[]])),
        startTime: z.string().refine(
            time => {
                const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                return regex.test(time);
            }
        ),
        endTime: z.string().refine(
            time => {
                const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                return regex.test(time);
            }
        ),
    }).refine(
        body => {
            const start = new Date(`2020-10-01T${body.startTime}:00`);
            const end = new Date(`2020-10-01T${body.endTime}:00`);

            console.log('--', start);
            console.log('--', end);
            return end > start;
        },
        {
            message: 'Start time should be before End time.'
        }
    )
});

export const updatedOfferedCourseValidationSchema = z.object({
    body: z.object({
        faculty: z.string().optional(),
        maxCapacity: z.string().optional(),
        days: z.enum([...Days] as [string, ...string[]]).optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
    }),
});