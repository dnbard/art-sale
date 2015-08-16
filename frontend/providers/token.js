var uuid = require('node-uuid').v4;

var token = document.querySelector('#token').value;
document.querySelector('#token').value = uuid();

exports.get = function(){
    return token;
}
