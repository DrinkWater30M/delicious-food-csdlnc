var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

//[GET] /product/list?search=params&shop=params
router.get('/list', productController.getProductListPage);

module.exports = router;
