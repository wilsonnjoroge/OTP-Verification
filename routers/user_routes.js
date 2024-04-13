const router = require('express').Router();
const {signUp, verifyOtp, signup} = require('../controller/user_controller');

router.post('/signup', signUp );
router.post('/verifyotp', verifyOtp)


module.exports = router;