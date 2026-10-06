const express = require('express');
const router = express.Router();
const {registeredUser} = require('../controller/authController');
const loginUser = require('../controller/loginController');

router.post('/register',registeredUser);
router.post('/login', loginUser);
module.exports = router;