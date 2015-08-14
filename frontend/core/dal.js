var request = require('superagent');
var origin = location.origin;
var objectAssign = require('object-assign');

var config = [{
    endpoint: 'getUserById',
    method: 'get',
    url: 'api/users/{id}'
}];

function makeRequest(options){
    return new Promise(function(resolve, reject){
        var myregexp = /\{([a-z]*)\}/gi;
        var match = myregexp.exec(options.url);
        var params = [];
        var url = options.url;

        while (match != null) {
            params.push(match[1]);
            match = myregexp.exec(options.url);
        }

        params.forEach((p) => {
            url = url.replace('{' + p + '}', options[p]);
        });

        request[options.method](url, function(err, response){
            if (err && err.status >= 400){
                return reject(err, response);
            }

            return resolve(response);
        });
    });
}

var DAL = {};

config.forEach((c) => {
    DAL[c.endpoint] = function(options){
        return makeRequest.call(this, objectAssign(options, c));
    }
});

module.exports = DAL;
