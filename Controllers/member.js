const Member = require('../Modals/member');
const Membership = require('../Modals/membership')


exports.getAllMember = async (req, res) => {
    try {
        const { skip, limit } = req.query;
        const members = await Member.find({});
        const totalMember = members.length;

        const limitedMembers = await Member.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);

        res.status(200).json({
            message: members.length ? "fetched members success" : "no any member register yet",
            members: limitedMembers,
            totalMember: totalMember,
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' });
    }

}

function addMonthsToDate(months, joiningDate) {
    const date = new Date(joiningDate);
    const day = date.getDate();

    // Tambah bulan
    date.setMonth(date.getMonth() + months);

    // Ambil jumlah hari maksimum di bulan hasil
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Atur tanggal akhir
    date.setDate(Math.min(day, lastDay));

    return date;
}


exports.registerMember = async (req, res) => {
    try {
        const { name, mobileNo, addres, membership, profilePic, joiningDate } = req.body;
        const member = await Member.findOne({ gym: req.gym._id, mobileNo });
        if (member) {
            return res.status(409).json({ error: 'alredy registerd with this mobile no' });
        }

        const memberShip = await Membership.findOne({ _id: membership, gym: req.gym._id })
        const membershipMonth = memberShip.months;
        if (memberShip) {
            let joinDate = new Date(joiningDate);
            const nextBillDate = addMonthsToDate(membershipMonth, joinDate);
            let newmember = new Member({ name, mobileNo, addres, membership, gym: req.gym._id, profilePic, nextBillDate });
            await newmember.save();
            res.status(200).json({ message: "member registerd succes", newmember });


        } else {
            return res.status(409).json({
                error: "no such membership are there"
            })
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' });
    }
}