import { Schema, model } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const course = new Schema<TCourse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    prefix: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: Number,
        trim: true,
        required: true
    },
    credits: {
        type: Number,
        trim: true,
        required: true
    },
    isDeleted: {
        type: Number
    },
    preRequisiteCourses: [preRequisiteCoursesSchema]
})

const courseFacultySchema = new Schema<TCourseFaculty>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        unique: true
    },
    faculites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Faculty'
        }
    ]
})

export const Course = model<TCourse>('Course', course);
export const CourseFaculty = model<TCourseFaculty>('CourseFaculty', courseFacultySchema);