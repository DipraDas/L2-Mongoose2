import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get("/", StudentControllers.getAllStudents); // will call controller function
router.get("/:studentId", StudentControllers.getSingleStudent);
router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;