import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../utils/validateRequest';
import { studentValidations } from '../student/student.zodValidator';
import { facultyValidations } from '../Faculty/faculty.validation';

const router = express.Router();

router.post('/create-student',
    validateRequest(studentValidations.createStudentValidationSchema),
    UserControllers.createStudent
);

router.post('/create-faculty',
    validateRequest(facultyValidations.createFacultyValidationSchema),
    UserControllers.createFaculty
);

export const UserRoutes = router;