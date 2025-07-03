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

exports.searchMember = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const member = await Member.find({
            gym: req.gym._id,
            $or: [{ name: { $regex: '^' + searchTerm, $options: 'i' } },
            { mobileNo: { $regex: '^' + searchTerm, $options: 'i' } }

            ]
        });
        res.status(200).json({
            message: member.length ? "fetched members succes" : "no such member registerd",
            members: member,
            totalMember: member.length
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' });
    }
}

exports.monthlyMember = async (req, res) => {
    try {
        const now = new Date(); // ✅ Tambahkan ini
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        const member = await Member.find({
            gym: req.gym._id,
            createdAt: {
                $gte: startOfMonth,
                $lte: endOfMonth

            }
        }).sort({ createdAt: -1 });
        res.status(200).json({
            message: member.length ? "fetched members succes" : "no such member registerd",
            members: member,
            totalMember: member.length
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' });
    }
}

exports.expiringwithin3Days = async (req, res) => {
    try {
        const today = new Date();
        const nextThreeDays = new Date();
        nextThreeDays.setDate(today.getDate() + 3);

        const member = await Member.find({
            gym: req.gym._id,
            nextBillDate: {
                $gte: today,
                $lte: nextThreeDays

            }
        });

        res.status(200).json({
            message: member.length ? "fetched members succes" : "no such member is expired 3 days",
            members: member,
            totalMember: member.length
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' });
    }
}

exports.expiringwithin4To7Days = async (req, res) => {
    try {
        const today = new Date();
        const next4Days = new Date();
        next4Days.setDate(today.getDate() + 4)

        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7)


        const member = await Member.find({
            gym: req.gym._id,
            nextBillDate: {
                $gte: next4Days,
                $lte: next7Days

            }
        });
        res.status(200).json({
            message: member.length ? "fetched members succes" : "no such member is expired 4-7 days",
            members: member,
            totalMember: member.length
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' });
    }
}

exports.expiredMember = async (req, res) => {
    try {
        const today = new Date();

        const member = await Member.find({
            gym: req.gym._id, status: "Active",
            nextBillDate: {
                $lt: today
            }
        })

        res.status(200).json({
            message: member.length ? "fetched members succes" : "no such member has been expired",
            members: member,
            totalMember: member.length
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' });
    }
}


exports.InActiveMember = async (req, res) => {
    try {
        const member = await Member.find({ gym: req.gym._id, status: "Pending" });

        res.status(200).json({
            message: member.length ? "fetched members succes" : "no such member is pending",
            members: member,
            totalMember: member.length
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' });
    }
}

exports.getMemberDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findOne({ _id: id, gym: req.gym._id });
        if (!member) {
            return res.status(400).json({
                error: "no such member"
            })
        }
        res.status(200).json({
            message: "member data fetched",
            members: member

        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' });
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const member = await Member.findOne({ _id: id, gym: req.gym._id });
        if (!member) {
            return res.status(400).json({
                error: "no such member"
            })
        }
        member.status = status;
        await member.save();
        res.status(200).json({ message: "status changed succes" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' });
    }
}

exports.updateMemberPlan = async (req, res) => {
    try {
        const { membership } = req.body;
        const { id } = req.params;
        const memberShip = await Membership.findOne({ gym: req.gym._id, _id: membership });
        if (memberShip) {
            let getMonth = memberShip.months;
            let today = new Date();
            let nextBillDate = addMonthsToDate(getMonth, today);
            const member = await Member.findOne({ gym: req.gym._id, _id: id });
            if (!member) {
                return res.status(409).json({ error: "no such member there" })
            }
            member.nextBillDate = nextBillDate;
            member.lastPayment = today;

            await member.save();
            res.status(200).json({ message: "member renewed succesfulls", member });

        } else {
            return res.status(409).json({ error: "no such member there" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' });
    }
}