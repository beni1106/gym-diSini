const mongoose = require("mongoose");


const memberSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    mobileNo: {
        type: String,

    },
    address: {
        type: String,

    },
    membership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "membership",
        require: true
    },
    gym: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "gym",
        require: true
    },
    profilPic: {
        type: String,
        require: true,

    },
    status: {
        type: String,
        default: "Active"
    },
    lastPayment: {
        type: Date,
        default: new Date(),

    },
    nextBillDate: {
        type: Date,
        require: true

    }
})

const memberModel = mongoose.Model("member", memberSchema);

module.exports = memberModel;