var alt = require('../alt');
var HeroesActions = require('../actions/heroesActions');
var UserStore = require('../stores/user');
var DAL = require('../core/dal');

class HeroesStore {
    constructor() {
        this.heroes = [];

        this.bindListeners({
            handleUpdateHeroes: HeroesActions.UPDATE_HEROES,
            handleFetchHeroes: HeroesActions.FETCH_HEROES
        });

        UserStore.listen(function(){
            setTimeout(HeroesActions.fetchHeroes, 0);
        });
    }

    handleUpdateHeroes(heroes) {
        this.heroes = heroes;
    }

    handleFetchHeroes(){
        var user = UserStore.getState().user;

        if (!user || typeof user._id !== 'string'){
            return;
        }

        DAL.getHeroesByUser({
            uid: user._id
        }).then((response) => {
            HeroesActions.updateHeroes(response.body);
        }).catch(() => {
            HeroesActions.updateHeroes([]);
        });
    }
}

module.exports = alt.createStore(HeroesStore, 'HeroesStore');
