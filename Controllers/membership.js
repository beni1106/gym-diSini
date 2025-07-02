const membership = require('../Modals/membership');

exports.addMembership = async (req, res) => {
    try {
        const { months, price } = req.body;
        const memberShip = await membership.findOne({ gym: req.gym._id, months });
        if (memberShip) {
            memberShip.price = price;
            await memberShip.save();
            res.status(200).json({ error: "update success" })
        } else {
            const nuwMembership = new membership({ price, months, gym: req.gym._id });
            await nuwMembership.save();
            res.status(200).json({ error: "added success" })
        }
    } catch (err) {
        res.status(500).json({ error: "Server Error" })
    }
}

exports.getmembership = async (req, res) => {
    try {
        const loggedInId = req.gym._id;
        const memberShip = await membership.find({ gym: loggedInId });
        res.status(200).json({
            message: "update success",
            membership: memberShip
        })
    } catch (err) {
        res.status(500).json({ error: "Server Error" })
    }
}

