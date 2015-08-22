var Auth = require('./middleware/auth');
var passport = require('passport');
var IndexController = require('./controllers');
var UsersController = require('./controllers/users');
var HeroesController = require('./controllers/heroes');
var ActorsController = require('./controllers/actors');

exports.init = function(app){
    app.get('/', IndexController.default);

    app.get('/data', [Auth.basic], function (req, res) {
        res.send('DAATA');
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.get('/api/users/:uid', [Auth.api], UsersController.getOneById);

    app.get('/api/users/:uid/heroes', [Auth.api], HeroesController.getAllByUser);

    app.get('/api/instance/:iid/actors', [Auth.api], ActorsController.getFewByInstance);





    app.use(function(err, req, res, next){
        err = typeof err === 'object' ? err : { message: err, status: 500 }

        console.log(err.message);
        res.status(err.status || 500).send(err);
    });

    console.log('Routing initialized');
}
