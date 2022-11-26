const productService = require('../services/productService');

async function getProductListPage(req, res){
    try{
        //get params
        const foodShop = req.query.foodShop;
        const search = req.query.search;
        const page = req.query.page;
        
        //get product list
        const productList = await productService.getProductList(foodShop, search, page);

        //return client
        res.render('productView/productList.hbs', {productList});
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getProductListPage,
}