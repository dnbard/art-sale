var alt = require('../alt');

var DAL = require('../core/dal');

class HeroesActions {
    updateHeroes(heroes) {
        this.dispatch(heroes);
    }

    fetchHeroes(){
        this.dispatch();
    }
}

module.exports = alt.createActions(HeroesActions);
