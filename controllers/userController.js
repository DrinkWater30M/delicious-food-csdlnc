const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

async function getLoginPage(req, res){
    try{
        res.render('userView/login.hbs', {error: req.flash('error')[0]});
    }
    catch(error){
        console.log(error);
    }
} 

async function login(req, res){
    try{
        console.log(req.body)
    }
    catch(error){
        console.log(error);
    }
}

async function getRegisterPage(req, res){
    try{
        res.render('userView/register.hbs', {error: req.flash('error')[0]});
    }
    catch(error){
        console.log(error);
    }
}

async function register(req, res){
    try{
        const {username, password} = req.body;
        //check username
        const userAccount = await userService.getAccount(username);
        if(userAccount){
            res.render('userView/register', {error: "Username already exists!"});
            return;
        }

        //hash password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        //add new account
        await userService.addAccount(username, hashPassword);

        //return
        const userInfo = await userService.getInfoByUserName(username);
        req.login({KhachHangID: userInfo.KhachHangID, Username: userInfo.Username}, function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }
    catch(error){
        console.log(error);
    }
}
module.exports = {
    getInfo,
    getLoginPage,
    login,
    getRegisterPage,
    register,
}