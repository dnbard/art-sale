var alt = require('../alt');
var DAL = require('../core/dal');

var userId = require('../providers/userId').get();

class UserActions {
    updateUser(user) {
        this.dispatch(user);
    }

    fetchUser(){
        DAL.getUserById({ uid: userId })
            .then((r) => {
                this.actions.updateUser(r.body);
            }).catch((r) => {
                this.actions.updateUser(null);
            });
    }
}

module.exports = alt.createActions(UserActions);
