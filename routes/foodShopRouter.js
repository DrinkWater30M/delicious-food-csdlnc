var express = require('express');
var router = express.Router();
const foodShopController = require('../controllers/foodShopController');

/* GET food shop list page. */
router.get('/list', foodShopController.getFoodShopListPage);

module.exports = router;
