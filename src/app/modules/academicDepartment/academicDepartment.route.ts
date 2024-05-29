import { Router } from "express";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";
import { AcademicDepartmentController } from "./academicDepartment.controller";
import validateRequest from "../../utils/validateRequest";

const router = Router();

router.post(
    "/create-department",
    validateRequest(
        AcademicDepartmentValidations.createAcademicDepartmentValidationSchema
    ),
    AcademicDepartmentController.createAcademicDepartment
);
router.patch(
    "/:departmentId",
    validateRequest(
        AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema
    ),
    AcademicDepartmentController.updateAcademicDepartment
);
router.get("/", AcademicDepartmentController.getAllAcademicDepartment);
router.get(
    "/:departmentId",
    AcademicDepartmentController.getSingleAcademicDepartment
);

export const AcademicDepartmentRoutes = router;