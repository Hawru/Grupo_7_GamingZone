function authGuestMiddleWare(req, res, next){
    if(req.session.user){
        return res.render('404', {auth: 'No puedes entrar a esta parte'})
    } 
    next();
}

module.exports = authGuestMiddleWare;