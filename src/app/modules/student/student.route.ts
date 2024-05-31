import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../utils/validateRequest';
import { studentValidations } from './student.zodValidator';

const router = express.Router();

router.get("/", StudentControllers.getAllStudents);
router.get("/:studentId", StudentControllers.getSingleStudent);
router.patch(
    "/:studentId",
    validateRequest(studentValidations.updateStudentValidationSchema),
    StudentControllers.updateSingleStudent
);
router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;