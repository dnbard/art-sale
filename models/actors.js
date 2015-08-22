var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid').v4;

var schema =  new Schema({
    _id: { type: String, index: true, default: uuid },
    instanceId: { type: String, index: true },
    position: {
        x: Number,
        y: Number
    },
    size: Number,
    type: String
});

var Actor = mongoose.model('Actors', schema);

module.exports = Actor;
