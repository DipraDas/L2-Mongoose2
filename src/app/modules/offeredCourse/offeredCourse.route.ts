import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { createOfferedCourseValidationSchema, updateOfferedCourseValidationSchema } from "./offeredCourse.validation";
import { OfferedCourseController } from "./offeredCourse.controller";


const router = Router();

router.get("/", OfferedCourseController.getAllOfferedCourse);
router.get("/:id", OfferedCourseController.getSingleOfferedCourse);
router.post(
    "/create-offered-course",
    validateRequest(createOfferedCourseValidationSchema),
    OfferedCourseController.createOfferedCourse
);
router.patch(
    "/:id",
    validateRequest(updateOfferedCourseValidationSchema),
    OfferedCourseController.updateOfferedCourse
);
router.delete('/:courseId/remove-offered-course',
    OfferedCourseController.deleteOfferedCourse
);

export const OfferedCourseRoutes = router;