var express = require('express');
var router = express.Router();
const userController =require('../controllers/userController');

/* GET users listing. */
router.get('/info', userController.getInfo);

module.exports = router;
