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
router.patch(
    "/:id",
    validateRequest(CourseValidation.updateCourseValidationSchema),
    CourseController.updateCourse
);
router.get("/", CourseController.getAllCourses);
router.get("/:id", CourseController.getSingleCourse);
router.delete("/:id", CourseController.deleteCourse);

export const CourseRoutes = router;