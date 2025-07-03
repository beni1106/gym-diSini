const mongoose = require("mongoose")

const MembershipSChema = mongoose.Schema({
    months: {
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    gym: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "gym",
        require: true
    }
}, { timestamps: true })

const modalMembership = mongoose.model("membership", MembershipSChema);

module.exports = modalMembership;