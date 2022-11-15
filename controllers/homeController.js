const userService = require('../services/userService');
const foodService = require('../services/foodService');

async function getHomePage(req, res){
    try{
        //get list food
        const food = await foodService.getAllFood();

        res.render('home.hbs', {food: JSON.stringify(food)});
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getHomePage,
}