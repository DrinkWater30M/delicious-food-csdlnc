var express = require('express');
var router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const authController = require('../auth/authController');

/* GET users listing. */
router.get('/info', userController.getInfo);

// GET login page
router.get('/login', userController.getLoginPage);

// POST login page
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash : true
}) );

// POST logout page
router.post('/logout', authController.logout);

// GET register page
router.get('/register', userController.getRegisterPage);

// POST register
router.post('/register', userController.register);

module.exports = router;
