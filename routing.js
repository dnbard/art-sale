var ensureAuthenticated = require('./middleware/auth');
var passport = require('passport');

exports.init = function(app){
    app.get('/', require('../controllers').default);

    app.get('/data', ensureAuthenticated, function (req, res) {
        res.send('DAATA');
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
}
