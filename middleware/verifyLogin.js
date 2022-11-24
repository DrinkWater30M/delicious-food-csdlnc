function verifyLogin(req, res, next){
    if(!req.user){
        redirect('/user/login');
        return;
    }

    res.locals.user = {...req.user};
    return next(); 
}

module.exports = {
    verifyLogin,
}