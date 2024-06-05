import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { CourseValidation } from "./course.validation";
import { CourseController } from "./course.controller";

const router = Router();

router.get("/", CourseController.getAllCourses);
router.get("/:id", CourseController.getSingleCourse);
router.post(
    "/create-course",
    validateRequest(CourseValidation.createCourseValitionScrema),
    CourseController.createCourse
);
router.patch(
    "/:id",
    validateRequest(CourseValidation.updateCourseValitionScrema),
    CourseController.updateCourse
);

export const CourseRoutes = router;