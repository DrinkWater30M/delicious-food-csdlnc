const foodShopService = require('../services/foodShopService');

async function getFoodShopListPage(req, res){
    try{
        //get query
        const search = req.query.search;
        const page = req.query.page;

        //
        const foodShopList = await foodShopService.getFoodShopList(search, page);
        
        //return
        res.render('foodShopView/foodShopList.hbs', {foodShopList});
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getFoodShopListPage,
}