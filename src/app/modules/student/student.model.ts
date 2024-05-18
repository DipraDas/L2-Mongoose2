import { Schema, model, connect } from "mongoose";
import { Guardian, LocalGuardian, Student, UserName } from "./student.interface";

const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        required: [true, 'First Name Is Required']
    },
    middleName: String,
    lastName: {
        type: String,
        required: [true, 'Last Name Is Required']
    },
});

const gurdianSchema = new Schema<Guardian>({
    fatherName: {
        type: String,
        required: true
    },
    fatherOccupation: {
        type: String,
        required: true
    },
    fatherContactNo: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    motherOccupation: {
        type: String,
        required: true
    },
    motherContactNo: {
        type: String,
        required: true
    },
});

const localGurdianSchema = new Schema<LocalGuardian>({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    relation: {
        type: String,
        required: true
    },
});

const studentSchema = new Schema<Student>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: userNameSchema,
        required: true
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: '{VALUE} is not valid'
        },
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    emergencyContactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },
    presentAddress: {
        type: String,
        required: true
    },
    permanentAdress: {
        type: String,
        required: true
    },
    guardian: gurdianSchema,
    localGuardian: {
        type: localGurdianSchema,
        required: true
    },
    profileImg: String,
    isActive: {
        type: String,
        enum: ["active", "blocked"],
        default: 'active'
    },
});

export const StudentModel = model<Student>('Student', studentSchema);