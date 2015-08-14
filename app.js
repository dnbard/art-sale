var express = require('express');
var app = express();
var mongoose = require('mongoose');

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
