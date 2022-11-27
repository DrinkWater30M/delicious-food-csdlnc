var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const middleware = require('../middleware/verifyLogin');

//[GET] /product/list?search=params&shop=params
router.get('/list', productController.getProductListPage);

//
router.get('/detail/:id', productController.getProductDetail);

//
router.post('/detail/:id', middleware.verifyLogin, productController.addtoCart);

module.exports = router;
