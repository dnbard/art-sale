var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid').v4;

var Actor = require('./actors');

var schema =  new Schema({
    _id: { type: String, index: true, default: uuid }
});

schema.static('createBasic', function(){
    var instance = new Instance();
    instance.save();

    for(var i = 0; i < 4; i ++){
        var actor = new Actor({
            type: 'npc-hostile',
            position: {
                x: Math.round((Math.random() - 0.5) * 1000),
                y: Math.round((Math.random() - 0.5) * 800) },
            size: 12,
            instanceId: instance._id
        });

        actor.save();
    }

    return instance;
});

var Instance = mongoose.model('Instance', schema);

module.exports = Instance;
