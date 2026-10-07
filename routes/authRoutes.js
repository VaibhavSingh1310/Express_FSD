const express = require('express');
const router = express.Router();
const {registeredUser} = require('../controller/authController');
const loginUser = require('../controller/loginController');
const logoutUser = require('../controller/logOut');

router.post('/register',registeredUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
module.exports = router;