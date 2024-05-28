import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../utils/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post('/create-academic-semester',
    validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemester
);
router.patch(
    "/update-semester",
    validateRequest(
        AcademicSemesterValidations.updateAcademicSemesterValidationSchema
    ),
    AcademicSemesterControllers.updateAcademicSemester
);
router.get("/", AcademicSemesterControllers.getAllAcademicSemester);
router.get(
    "/:semesterId",
    AcademicSemesterControllers.getSingleAcademicSemester
);

export const AcademicSemesterRoutes = router;