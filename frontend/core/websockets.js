var PubSub = require('pubsub-js');

exports.init = function(){
    var token = require('../providers/token').get();
    var uid = require('../providers/userId').get();

    var ws = new WebSocket(`ws://localhost:3000?token=${token}&uid=${uid}`);
    ws.onclose = function(e){
        if (e.type === 'close'){
            //do nothing
            return;
        }

        //TODO: handle reconnect here
    }

    ws.onmessage = function(message){
        var data = JSON.parse(message.data);

        console.log('WebSocket Message: %o', data);
        PubSub.publish(typeof data.type === 'string' ? 'websocket.' + data.type : 'websocket', data);
    }

    return ws;
}
