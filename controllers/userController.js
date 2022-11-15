const userService = require('../services/userService');

async function getInfo(req, res){
    try{
        //get username from request, now use mock data
        const username = 'khachhang01';
        const userInfo = await userService.getInfo(username);

        //
        console.log(userInfo)
        res.send(JSON.stringify(userInfo));
    
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getInfo,

}