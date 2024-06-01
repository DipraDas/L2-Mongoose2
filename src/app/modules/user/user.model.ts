import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
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

export const User = model<TUser>('User', userSchema)