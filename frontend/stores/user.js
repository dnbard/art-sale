var alt = require('../alt');
var UserActions = require('../actions/userActions');

class UserStore {
    constructor() {
        this.user = null;

        this.bindListeners({
            handleUpdateUser: UserActions.UPDATE_USER
        });

        UserActions.fetchUser();
    }

    handleUpdateUser(user) {
        this.user = user;
    }
}

module.exports = alt.createStore(UserStore, 'UserStore');
