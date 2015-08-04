var mongoose = require('mongoose');

var Users = mongoose.model('User', {
    displayName: String,
    created: Date,
    facebookId: { type: String, index: true }
});

module.exports = Users;
