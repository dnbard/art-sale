var Actors = require('../models/actors');

exports.getFewByInstance = function(req, res, next){
    var instanceId = req.params.iid;

    Actors.find({ instanceId: instanceId }).exec().then(function(actors){
        res.send(actors);
    }, function(err){
        next(err);
    });
}
