import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { CourseValidation } from "./course.validation";
import { CourseController } from "./course.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/", CourseController.getAllCourses);
router.get("/:id",
    auth('student', 'faculty', 'admin'),
    CourseController.getSingleCourse);
router.post(
    "/create-course",
    auth('admin'),
    validateRequest(CourseValidation.createCourseValitionScrema),
    CourseController.createCourse
);
router.patch(
    "/:id",
    validateRequest(CourseValidation.updateCourseValitionScrema),
    CourseController.updateCourse
);
router.put('/:courseId/assign-faculties',
    validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
    CourseController.assignFaculties
);
router.delete('/:courseId/remove-faculties',
    validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
    CourseController.removeFaculties
);

export const CourseRoutes = router;