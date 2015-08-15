var React = require('react');
var HeroesStore = require('../stores/heroes');
var HeroesListItem = require('./heroesListItem');

var HeroesList = React.createClass({
    getInitialState: function(){
        return HeroesStore.getState();
    },


    componentDidMount: function(){
        HeroesStore.listen(this.onChange);
    },
    componentWillUnmount: function(){
        HeroesStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function(){
        return (
            <div className="heroes">
                { this.state.heroes.map(h => <HeroesListItem key={h._id} hero={h} />) }
            </div>
        );
    }
});

module.exports = HeroesList;
