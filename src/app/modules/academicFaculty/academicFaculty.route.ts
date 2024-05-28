import { Router } from "express";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../utils/validateRequest";

const router = Router();

router.post(
    "/create-faculty",
    validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
    AcademicFacultyController.createAcademicFaculty
);
router.patch(
    "/:facultyId",
    validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
    AcademicFacultyController.updateAcademicFaculty
);
router.get("/", AcademicFacultyController.getAllAcademicFaculty);
router.get("/:facultyId", AcademicFacultyController.getSingleAcademicFaculty);

export const AcademicFacultyRoutes = router;