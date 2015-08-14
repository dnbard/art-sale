var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid').v4;

var schema = new Schema({
    _id: { type: String, index: true, default: uuid },
    displayName: String,
    created: Date,
    race: String,
    class: String,
    _creator: { type: String, ref: 'User' },
    itemLvl: Number,
    experience: Number
});

schema.static('createBasicHero', function(options, cb){
    console.log('Creating new basic hero');

    var hero = new Heroes({
        displayName: 'HERO',
        created: new Date(),
        race: 'human',
        class: 'warrior',
        _creator: options.userId,
        itemLvl: 1,
        experience: 0
    });

    hero.save(cb);
});

var Heroes = mongoose.model('Heroes', schema);

module.exports = Heroes;
