var queryString = require('query-string');
var Users = require('../models/users');

var Clients = new Map();
var Subscriptions = new WeakMap();

function init(wss){
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
                Clients.set(parsed.uid, ws);

                ws.on('close', function(){
                    console.log('Websocket client disconnected');
                    Clients.delete(parsed.uid);
                });
            }
        });
    });
}

function subscribe(client, channel){
    if (Subscriptions.has(channel)){
        var subscriptions = Subscriptions.get(channel);
        if (subscriptions.indexOf(client._id) === -1){
            subscriptions.push(client._id);
        }
    } else {
        Subscriptions.set(channel, [ client._id ]);
        console.log('Channel(id=%s) created', channel);
    }

    sendMessage(channel, {
        userId: client._id,
        type: 'subscribed',
        instanceId: channel._id
    }, client._id);

    console.log('User(id=%s) subscribed to channel(id=%s)', client._id, channel);
}

function unsubscribe(client, channel){
    var array, index;

    if (Subscriptions.has(channel)){
        array = Subscriptions.get(channel);
        index = array.indexOf(client._id);
        if (index > -1) {
            Subscriptions.set(channel, array.splice(index, 1));

            sendMessage(channel, {
                userId: client._id,
                type: 'unsubscribed',
                instanceId: channel._id
            }, client._id);

            console.log('User(id=%s) unsubscribed from channel(id=%s)', client._id, channel);
        } else {
            console.log('User(id=%s) failed to unsubscribed from channel(id=%s)', client._id, channel);
        }
    } else {
        console.log('Channel(id=%s) not found; user(id=%s) cannot unsubscribe', channel, client._id);
    }
}

function sendMessage(channel, message, id){
    var clients = Subscriptions.get(channel);
    var messageToSend = typeof message === 'string' ? message : JSON.stringify(message);

    clients.forEach(function(clientId){
        if (typeof id === 'string' && clientId !== id){
            return true;
        }

        var ws = Clients.get(clientId);
        ws.send(messageToSend);
    });
}

module.exports = {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    init: init,
    sendMessage: sendMessage
};
