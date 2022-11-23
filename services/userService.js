const sequelize = require('../models');
const { QueryTypes } = require('sequelize');
const generateID = require('../utils/generateID');

async function getInfoByUserName(username){
    try{
        const sql = `select * from KhachHang where KhachHang.Username = '${username}'`;
        
        const userInfo = await sequelize.query(sql,  { type: QueryTypes.SELECT });

        return userInfo.length === 0 ? null : userInfo[0];
    }
    catch(error){
        console.log(error);
    }
}

async function editUserInfo(username, hoten, email, sdt, diachi){
    try{
        const sql = `UPDATE KhachHang SET HoTen = '${hoten}', Email= '${email}', SoDienThoai = '${sdt}', DiaChi= '${diachi}' where KhachHang.Username = '${username}'`;
        
        const userInfo = await sequelize.query(sql,  { type: QueryTypes.UPDATE });

        return userInfo.length === 0 ? null : userInfo[0];
    }
    catch(error){
        console.log(error);
    }
}

async function getAccount(username){
    try{
        const sql = `select * from TaiKhoan where TaiKhoan.Username = '${username}'`;
        
        const userInfo = await sequelize.query(sql,  { type: QueryTypes.SELECT });

        return userInfo.length === 0 ? null : userInfo[0];
    }
    catch(error){
        console.log(error);
    }
}

async function addAccount(username, hashPassword){
    try{
        //generate id
        const KhachHangID = generateID("KH");
        const sql = 
        `
            insert into TaiKhoan values ('${username}', '${hashPassword}', null);
            insert into KhachHang(KhachHangID, Username) values ('${KhachHangID}', '${username}');
        `;
        
        await sequelize.query(sql);
    }
    catch(error){
        console.log(error);
    }
}




module.exports = {
    getInfoByUserName,
    getAccount,
    addAccount,
    editUserInfo,
}