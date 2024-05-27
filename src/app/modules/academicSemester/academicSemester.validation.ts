import { z } from 'zod';

// Define the Zod schemas for the string literals
const months = z.enum([
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]);

const academicSemesterNames = z.enum(['Autumn', 'Summar', 'Fall']);

const academicSemesterCodes = z.enum(['01', '02', '03']);

// Define the main Zod schema for IAcademicSemester
const academicSemesterSchema = z.object({
    name: academicSemesterNames,
    code: academicSemesterCodes,
    year: z.date(),
    startMonth: months,
    endMonth: months
});

// Export the schema
export const validateAcademicSemester = {
    academicSemesterSchema
};
