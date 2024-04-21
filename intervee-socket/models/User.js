const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Interviewer", "Interviewee"],
        default: "Interviewer"
    },
    image: String,
    nicImage: String,
    cv: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
