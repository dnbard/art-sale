var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27018/art-sale', require('./core/configParser')(function(config){
    var server = app.listen(process.env.PORT || config.get('port'), function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);
    });

    require('./middleware').init(app);
    require('./middleware/passport').init(app);
    require('./routing').init(app);
}));
