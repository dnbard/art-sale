var uuid = require('node-uuid').v4;

var userId = document.querySelector('#user-id').value;
document.querySelector('#user-id').value = uuid();

exports.get = function(){
    return userId;
}
