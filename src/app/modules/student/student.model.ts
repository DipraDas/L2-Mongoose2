import { Schema, model } from "mongoose";
import validator from 'validator';
import { TGuardian, TLocalGuardian, TStudent, StudentMethods, StudentModel, TUserName } from "./student.interface";

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        maxlength: [20, 'First Name cannot be more than 20 characters.'],
        trim: true,
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toLocaleUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: '{VALUE} is not in capitalized format.'
        }
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        trim: true,
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: '{VALUE} is not valid.'
        }
    },
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        required: [true, 'Father\'s Name is required'],
        trim: true
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Father\'s Occupation is required'],
        trim: true
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father\'s Contact Number is required'],
        trim: true
    },
    motherName: {
        type: String,
        required: [true, 'Mother\'s Name is required'],
        trim: true
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother\'s Occupation is required'],
        trim: true
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother\'s Contact Number is required'],
        trim: true
    },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, 'Local Guardian\'s Name is required'],
        trim: true
    },
    occupation: {
        type: String,
        required: [true, 'Local Guardian\'s Occupation is required'],
        trim: true
    },
    contactNo: {
        type: String,
        required: [true, 'Local Guardian\'s Contact Number is required'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Local Guardian\'s Address is required'],
        trim: true
    },
    relation: {
        type: String,
        required: [true, 'Relation to Local Guardian is required'],
        trim: true
    },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
    id: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User Id is required'],
        ref: 'User'
    },
    name: {
        type: userNameSchema,
        required: [true, 'Student\'s Name is required'],
        unique: true
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: '{VALUE} is not valid'
        },
        required: [true, 'Gender is required'],
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of Birth is required'],
        trim: true
    },
    contactNo: {
        type: String,
        required: [true, 'Contact Number is required'],
        trim: true
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency Contact Number is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: '{VALUE} is not a valid email type'
        }
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        trim: true
    },
    presentAddress: {
        type: String,
        required: [true, 'Present Address is required'],
        trim: true
    },
    permanentAdress: {
        type: String,
        required: [true, 'Permanent Address is required'],
        trim: true
    },
    guardian: guardianSchema,
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local Guardian details are required']
    },
    profileImg: {
        type: String,
        trim: true
    },
    admissionSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester'
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment'
    },
});

studentSchema.virtual("fullname").get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.middleName}`;
});

studentSchema.methods.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
}

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
