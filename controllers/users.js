var Users = require('../models/users');

exports.getOneById = function(req, res, next){
    var id = req.params.id;

    Users.findOne({ _id: id })
        .populate('heroes')
        .exec(function(err, user){
            if (err){
                return next(err);
            }

            res.send(user);
        });
}
