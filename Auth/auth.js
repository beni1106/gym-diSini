const Gym = require('../Modals/gym');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.cookie_token;
        if (!token) {
            console.log("NO TOKEN");
            return res.status(401).json({ error: 'No token provided' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODE JWT:", decode);

        const gym = await Gym.findById(decode.gym_id);
        if (!gym) {
            console.log("GYM NOT FOUND");
            return res.status(401).json({ error: 'User not found' });
        }

        req.gym = gym;
        console.log("AUTH PASSED:", gym.userName);
        next();

    } catch (err) {
        console.error("AUTH ERROR:", err.message);
        res.status(401).json({ error: 'Token is invalid' });
    }
};

module.exports = auth;
