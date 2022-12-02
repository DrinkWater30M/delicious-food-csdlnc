function verifyLogin(req, res, next){
    if(!req.user){
        res.redirect('/user/login');
        return;
    }

    return next(); 
}

function assignUser(req, res, next){
    if(req.user){
        res.locals.user = {...req.user};
    }
    
    next();
}

module.exports = {
    verifyLogin,
    assignUser
}