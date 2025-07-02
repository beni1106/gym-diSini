const express = require("express")
const router = express.Router();
const MemberController = require('../Controllers/member')
const auth = require('../Auth/auth')

router.get('/all-member', MemberController.getAllMember);
router.post('/register-member', auth, MemberController.registerMember);

module.exports = router;


