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

    return ws;
}
