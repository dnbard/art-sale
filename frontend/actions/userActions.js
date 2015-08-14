var alt = require('../alt');

var DAL = require('../core/dal');
var uuid = require('node-uuid').v4;

var userId = document.querySelector('#user-id').value;
document.querySelector('#user-id').value = uuid();


class UserActions {
    updateUser(user) {
        this.dispatch(user);
    }

    fetchUser(){
        DAL.getUserById({ id: userId })
            .then((r) => {
                this.actions.updateUser(r.body);
            }).catch((r) => {
                this.actions.updateUser(null);
            });
    }
}

module.exports = alt.createActions(UserActions);
