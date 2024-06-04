import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { CourseValidation } from "./course.validation";
import { CourseController } from "./course.controller";

const router = Router();

router.post(
    "/create-course",
    validateRequest(CourseValidation.createCourseValitionScrema),
    CourseController.createCourse
);
// router.patch(
//     "/:id",
//     validateRequest(AcademicFacultyValidation.AcademicFacultyValidationSchema),
//     AcademicFacultyController.updateAcademicFaculty
// );
router.get("/", CourseController.getAllCourses);
router.get("/:facultyId", CourseController.getSingleCourse);

export const CourseRoutes = router;