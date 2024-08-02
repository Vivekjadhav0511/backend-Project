
import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken',
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        password: {
            type: String,
            required: [true, "password is Required"]
        },
        refreshToken: {
            type: String
        },

    },
    { timestamps: true }
)

userSchema.pre("save", async function(next){
    if (!this.isModified("passwaord")) return next()

       this.password = bcrypt.hash(this.password,10)
       next()
})

userSchema.methods.isPasswordCorrect = async function (passwaord) {
   return await bcrypt.compare(passwaord,this.passwaord)
}

export const User = mongoose.model("User", userSchema)