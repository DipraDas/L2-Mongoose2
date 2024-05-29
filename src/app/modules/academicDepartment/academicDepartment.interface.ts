import { Types } from "mongoose"

export type TACademicDepartment = {
    name: string,
    academicFaculty: Types.ObjectId
}