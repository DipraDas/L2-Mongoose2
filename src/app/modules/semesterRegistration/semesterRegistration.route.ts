import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { SemesterRegistrationController } from "./semesterRegistration.controller";
import { SemesterRegistrationValidationSchema } from "./semesterRegistration.validation";

const router = Router();

router.get("/", SemesterRegistrationController.getAllSemesterRegistration);
router.get("/:id", SemesterRegistrationController.getSingleSemesterRegistration);
router.post(
    "/create-semester-registration",
    validateRequest(SemesterRegistrationValidationSchema.createSemesterRegistrationValidationSchema),
    SemesterRegistrationController.createSemesterRegistration
);
router.patch(
    "/:id",
    validateRequest(SemesterRegistrationValidationSchema.updateSemesterRegistrationValidationSchema),
    SemesterRegistrationController.updateSemesterRegistration
);
// router.put('/:courseId/assign-faculties',
//     validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
//     SemesterRegistrationController.assignFaculties
// );
router.delete('/:courseId/remove-faculties',
    validateRequest(SemesterRegistrationValidationSchema.createSemesterRegistrationValidationSchema),
    SemesterRegistrationController.deleteSemesterRegistration
);

export const SemesterRegistrationRoutes = router;