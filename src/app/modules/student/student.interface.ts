import { Model } from "mongoose";

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
    relation: string;
}

export type TStudent = {
    id: string;
    name: TUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string,
    permanentAdress: string,
    guardian: TGuardian,
    localGuardian: TLocalGuardian;
    profileImg?: string;
    isActive: 'active' | 'inActive'
}

// export type StudentMethods = {
//     isUserExists(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<
//     TStudent,
//     Record<string, never>,
//     StudentMethods
// >

export interface StudentModel extends Model<TStudent> {
    isStudentExists(id: string): Promise<TStudent | null>;
}