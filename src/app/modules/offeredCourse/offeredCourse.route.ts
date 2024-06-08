import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { createOfferedCourseValidationSchema } from "./offeredCourse.validation";
import { OfferedCourseController } from "./offeredCourse.controller";


const router = Router();

// router.get("/", SemesterRegistrationController.getAllSemesterRegistration);
// router.get("/:id", SemesterRegistrationController.getSingleSemesterRegistration);
router.post(
    "/create-offered-course",
    validateRequest(createOfferedCourseValidationSchema),
    OfferedCourseController.createOfferedCourse
);
// router.patch(
//     "/:id",
//     validateRequest(SemesterRegistrationValidationSchema.updateSemesterRegistrationValidationSchema),
//     SemesterRegistrationController.updateSemesterRegistration
// );
// // router.put('/:courseId/assign-faculties',
// //     validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
// //     SemesterRegistrationController.assignFaculties
// // );
// router.delete('/:courseId/remove-faculties',
//     validateRequest(SemesterRegistrationValidationSchema.createSemesterRegistrationValidationSchema),
//     SemesterRegistrationController.deleteSemesterRegistration
// );

export const OfferedCourseRoutes = router;