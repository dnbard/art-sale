var express = require('express');
var app = express();
var mongoose = require('mongoose');
var babel = require("babel");

app.engine('jade', require('jade').__express);

babel.transformFile('./frontend/app.js', {}, function(err, result){
    var fs = require('fs');

    if (err){
        return console.log(err);
    }

    fs.writeFile('public/app.js', result.code, function(err){
        if (err){
            return console.log(err);
        }

        console.log('Babelified: public/app.js');
    });
});

mongoose.connect('mongodb://localhost:27017/artail', require('./core/configParser')(function(config){
    var server = app.listen(process.env.PORT || config.get('port'), function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);

        require('./services').create();

        require('./middleware').init(app);
        require('./middleware/passport').init(app);
        require('./routing').init(app);
    });
}));
