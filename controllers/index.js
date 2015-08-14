exports.default = function(req, res){
    if (!req.isAuthenticated()){
        return res.render('indexDefault.jade');
    }

    return res.render('indexAuth.jade', {
        userId: req.user._id
    });
}
