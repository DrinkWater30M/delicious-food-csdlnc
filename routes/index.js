var express = require('express');
var router = express.Router();

//root path
const homeRouter = require('./homeRouter');
router.use('/', homeRouter);

//user path
const userRouter = require('./userRouter');
router.use('/user', userRouter);

module.exports = router;
