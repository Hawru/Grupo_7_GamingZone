function authGuestMiddleWare(req, res, next){
    if(req.session.user){
        res.redirect('/users/profile');
    } else {
        next();
    }
}

module.exports = authGuestMiddleWare;