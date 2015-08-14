var InitializationService = require('./initialization');

exports.create = function(){
    console.log('Starting services initialization');

    InitializationService.create();

    console.log('Ending services initialization');
}
