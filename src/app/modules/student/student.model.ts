import { Schema, model, connect } from "mongoose";
import { Guardian, LocalGuardian, Student, UserName } from "./student.interface";

const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        required: true
    },
    middleName: String,
    lastName: {
        type: String,
        required: true
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
    id: String,
    name: userNameSchema,
    gender: ["male", "female"], //enum type not array
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
    bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    presentAddress: {
        type: String,
        required: true
    },
    permanentAdress: {
        type: String,
        required: true
    },
    guardian: gurdianSchema,
    localGuardian: localGurdianSchema,
    profileImg: String,
    isActive: ["active", "blocked"],
});


export const StudentModel = model<Student>('Student', studentSchema);