require('dotenv').config();
const express = require('express');
const app = express()
const cookieParser = require("cookie-parser");


const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
require('./DBConn/conn');

const GymRoutes = require('./Routes/gym');
const membershipRoutes = require('./Routes/membership');
const MemberRoutes = require('./Routes/member');


app.use('/auth', GymRoutes);
app.use('/plans', membershipRoutes);
app.use('/members', MemberRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});