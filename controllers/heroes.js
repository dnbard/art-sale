var Heroes = require('../models/heroes');
var Errors = require('../core/errors');

exports.getAllByUser = function(req, res, next){
    var userId = req.params.uid;

    if (!userId){
        return next(Errors.NOT_FOUND);
    }

    if (userId !== req.user._id){
        return next(Errors.AUTHORIZATION);
    }

    Heroes.find({ _creator: userId })
        .exec()
        .then(function(users){
            res.send(users);
        });
}
