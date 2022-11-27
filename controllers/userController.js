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

async function showUserInfo(req, res){
    try{
        //get username from request
        const username = req.user.Username;
        const userInfo = await userService.getInfoByUserName(username);
        // const info = userInfo[0];
        //
        res.render('userView/thongTinCaNhan', {
        HoTen: userInfo.HoTen,
        SoDienThoai: userInfo.SoDienThoai,
        DiaChi: userInfo.DiaChi,
        Email: userInfo.Email,
        })
    
    }
    catch(error){
        console.log(error);
    }
}

async function editPage(req, res){
    try{
        const username = req.user.Username;
        const userInfo = await userService.getInfoByUserName(username);
        console.log(userInfo.HoTen);
        console.log(userInfo.SoDienThoai);
        console.log(userInfo.DiaChi);
        if(userInfo.HoTen == null) userInfo.HoTen = 'empty';
        if(!userInfo.SoDienThoai) userInfo.SoDienThoai = 'empty'
        if(!userInfo.DiaChi) userInfo.DiaChi = 'empty'
        if(!userInfo.Email) userInfo.Email = 'empty'
        res.render('userView/editTrangCaNhan', {
            HoTen: userInfo.HoTen,
            SoDienThoai: userInfo.SoDienThoai,
            DiaChi: userInfo.DiaChi,
            Email: userInfo.Email,})
    
    }
    catch(error){
        console.log(error);
    }
}

async function editUserInfo(req, res){
    try{
        
        const username = req.user.Username;
        const email = req.body.email;
        const sdt = req.body.sodienthoai;
        const diachi = req.body.diachi;
        const hoten = req.body.hoten;
        const userInfo = await userService.getInfoByUserName(username);
        
        await userService.editUserInfo(username, hoten, email, sdt, diachi);

        // Có thể dùng res.render hoặc res.redirect('user/profile') đều được
        res.render('userView/thongTinCaNhan', 
        {HoTen: userInfo.HoTen,
        SoDienThoai: sdt,
        DiaChi: diachi,
        Email: email,
        })

        // res.redirect('user/profile');
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

// Đăng ký tài khoản
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
    showUserInfo,
    editUserInfo,
    editPage, 
}