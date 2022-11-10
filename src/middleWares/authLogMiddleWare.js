function authLogMiddleWare(req, res, next){
    if(!req.session.user){
        return res.render('404')
    } 
    next();
}

module.exports = authLogMiddleWare;