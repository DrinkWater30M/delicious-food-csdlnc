const productService = require('../services/productService');

async function getProductListPage(req, res){
    try{
        //get params
        const page = req.query.page;

        //get product list
        const productList = await productService.getProductList(page);

        //return client
        res.render('productView/productList.hbs', {productList, page});
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getProductListPage,
}