const mongoose = require("mongoose")


const gymSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,

    },
    userName: {
        type: String,
        require: true,

    },
    password: {
        type: String,
        require: true,

    },
    profilPic: {
        type: String,
        require: true,

    },
    gymName: {
        type: String,
        require: true,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }
}, { timestamps: true })

const modal = mongoose.model("gym", gymSchema);

module.exports = modal;