const express = require('express')
const app = express();


const PORT = 4000;

require('./DBConn/conn');

app.get('/', (req, res) => {
    res.send({ "message": "congrats your server is running succes" })
})

app.listen(PORT, () => {
    console.log("server is running Port 4000")
})