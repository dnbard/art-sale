var queryString = require('query-string');
var Users = require('../models/users');

var Clients = new Map();

exports.init = function(wss){
    wss.on('connection', function(ws){
        var parsed;

        try{
            parsed = queryString.parse(ws.upgradeReq.url.replace(/[\/|?]/g, ''));
        } catch(e){
            return ws.close();
        }

        Users.findById(parsed.uid, function(err, user){
            if (!user || user.wsToken !== parsed.token || Clients.has(parsed.uid)){
                ws.close();
                console.log('Websocket client auto-disconnected');
            } else {
                console.log('Websocket client connected');

                Clients.set(parsed.uid, parsed.token);

                ws.on('close', function(){
                    console.log('Websocket client disconnected');
                    Clients.delete(parsed.uid);
                });
            }
        });
    });
}
