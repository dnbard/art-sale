var dispatcher = require('../core/dispatcher');
var Events = require('../enums/events');
var Heroes = require('../models/heroes');
var Users = require('../models/users');

module.exports = {
    create: function(){
        console.log('Initialization service created');

        dispatcher.on(Events.USER.CREATED, function(user){
            console.log('New User Created(id:%s)', user._id);

            Heroes.createBasicHero({
                userId: user._id
            }, function(err, hero){
                if (err){
                    return console.log(err);
                }

                console.log('New Hero Created(id:%s)', hero._id);

                user.heroes.push(hero.id);
                user.save(function(){
                    console.log('Hero(id:%s) saved to user(id:%s)', hero._id, user._id);
                });
            });
        });
    }
}
