var express = require('express');
var app = express();
var mongoose = require('mongoose');
var browserify = require('browserify');
var babelify = require('babelify');
var fs = require('fs');
var WebSocketServer = require('ws').Server;

app.engine('jade', require('jade').__express);

browserify({ debug: true })
    .transform(babelify)
    .require('./frontend/app.js', { entry: true })
    .bundle()
    .on('error', function (err) { console.log('Error: ' + err.message); })
    .on('end', function(){ console.log('Browserified: /public/app.js'); })
    .pipe(fs.createWriteStream('./public/app.js'));

mongoose.connect('mongodb://localhost:27017/artail', require('./core/configParser')(function(config){
    console.log('Connected to database(type:mongodb)');

    var server = app.listen(process.env.PORT || config.get('port'), function () {
        require('./middleware').init(app);
        require('./middleware/passport').init(app);
        require('./routing').init(app);

        require('./services').create();

        var wss = new WebSocketServer({server: server});
        require('./core/websockets').init(wss);
    });
}));
