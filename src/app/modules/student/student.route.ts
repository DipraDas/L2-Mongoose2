import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../utils/validateRequest';
import { studentValidations } from './student.zodValidator';

const router = express.Router();

router.get("/", StudentControllers.getAllStudents);
router.get("/:id", StudentControllers.getSingleStudent);
router.patch(
    "/:id",
    validateRequest(studentValidations.updateStudentValidationSchema),
    StudentControllers.updateSingleStudent
);
router.delete("/id", StudentControllers.deleteStudent);

export const StudentRoutes = router;