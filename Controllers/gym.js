const nodemailer = require("nodemailer");
const Gym = require('../Modals/gym');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { userName, password, gymName, profilePic, email } = req.body;
        const isExist = await Gym.findOne({ userName });

        if (isExist) {
            return res.status(400).json({ error: "Username Already Exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newGym = new Gym({ userName, password: hashedPassword, gymName, profilePic, email });
        await newGym.save();

        res.status(201).json({ message: 'user register success', success: "yes", data: newGym });
    } catch (err) {
        res.status(500).json({ error: "Server Error" })
    }
}

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax'
};

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const gym = await Gym.findOne({ userName });

        if (gym && await bcrypt.compare(password, gym.password)) {
            const token = jwt.sign({ gym_id: gym._id }, process.env.JWT_SecretKey);

            res.cookie("cookie_token", token, cookieOptions)


            res.json({ message: 'logged in success', success: "true", gym, token });
        } else {
            res.status(401).json({ error: "Invalid username or password" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server Error" });
    }
};

// 💡 Diletakkan DI LUAR login
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const gym = await Gym.findOne({ email });

        if (!gym) return res.status(400).json({ error: 'Gym not found' });

        const buffer = crypto.randomBytes(4);
        const token = buffer.readUInt32BE(0) % 900000 + 100000;
        gym.resetPasswordToken = token;
        gym.resetPasswordExpires = Date.now() + 3600000;

        await gym.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Password Reset',
            text: `Your OTP is: ${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ error: 'server error', errorMsg: error });
            } else {
                res.status(200).json({ message: "OTP sent to your email" });
            }
        });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

exports.checkOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const gym = await Gym.findOne({
            email,
            resetPasswordToken: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!gym) return res.status(400).json({ error: "OTP is invalid or expired" });

        res.status(200).json({ message: "OTP is valid" });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const gym = await Gym.findOne({ email });

        if (!gym) return res.status(400).json({ error: 'User not found' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        gym.password = hashedPassword;
        gym.resetPasswordToken = undefined;
        gym.resetPasswordExpires = undefined;

        await gym.save();

        res.status(200).json({ message: "Password reset success" });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
}



exports.logout = async (req, res) => {
    res.clearCookie('cookie_token', cookieOptions).json({ message: 'logged out success' });
}