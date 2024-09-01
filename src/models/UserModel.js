const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: Number },
        isAdmin: { type: Boolean, default: false, required: true },
        avatar: { type: String },
        access_token: { type: String },
        refresh_token: { type: String },
    },
    {
        timestamps: true
    }
)
const User = mongoose.model("User", userSchema)

module.exports = User