async function logout(req, res, next) {
    await req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

module.exports = {
    logout,
}