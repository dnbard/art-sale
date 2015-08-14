var Auth = require('./middleware/auth');
var passport = require('passport');
var IndexController = require('./controllers');
var UsersController = require('./controllers/users');

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

    app.get('/api/users/:id', [Auth.api], UsersController.getOneById);

    console.log('Routing initialized');
}
