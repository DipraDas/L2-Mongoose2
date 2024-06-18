import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../utils/validateRequest';
import { studentValidations } from '../student/student.zodValidator';
import { facultyValidations } from '../Faculty/faculty.validation';
import { AdminValidations } from '../Admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post('/create-student',
    auth(USER_ROLE.admin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
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

router.post('/change-status/:id',
    auth(USER_ROLE.admin),
    validateRequest(UserValidation.changeStatusValidationSchema),
    UserControllers.changeStatus
);


export const UserRoutes = router;