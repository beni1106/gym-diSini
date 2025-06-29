const express = require('express');
const router = express.Router();
const membershipController = require('../Controllers/membership');
const auth = require('../Auth/auth');




router.post('/add-membership', auth, membershipController.addMembership);
router.get('/get-membership', auth, membershipController.getmembership)

module.exports = router;
