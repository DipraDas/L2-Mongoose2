import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: 0
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    passwordChangedAt: {
        type: Date
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    }
},
    {
        timestamps: true
    }
)

// pre save middleware/ hook : will work on create() and save()
userSchema.pre("save", async function (next) {
    const user = this; // doc

    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );
    next();
});

// post save middleware/ hook : will work on create() and save()
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});

// pre query middleware hook : will work on query
userSchema.pre("find", async function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findOne({ id }).select('+password')
}

userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
}

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimeStamp: Date,
    jwtIssuedTimestamp: number
) {
    const passwordChangedTime = new Date(passwordChangedTimeStamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
}

export const User = model<TUser, UserModel>('User', userSchema)