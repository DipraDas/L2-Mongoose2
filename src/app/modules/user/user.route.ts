import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../utils/validateRequest';
import { studentValidations } from '../student/student.zodValidator';
import { facultyValidations } from '../Faculty/faculty.validation';
import { AdminValidations } from '../Admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post('/create-student',
    auth(USER_ROLE.admin),
    validateRequest(studentValidations.createStudentValidationSchema),
    UserControllers.createStudent
);

router.post('/create-faculty',
    auth(USER_ROLE.admin),
    validateRequest(facultyValidations.createFacultyValidationSchema),
    UserControllers.createFaculty
);

router.post('/create-admin',
    validateRequest(AdminValidations.createAdminValidationSchema),
    UserControllers.createAdmin
);

router.get('/me',
    auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    UserControllers.getMe
);

export const UserRoutes = router;