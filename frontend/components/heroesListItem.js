var React = require('react');
var Experience = require('../../shared/experience');

var HeroesListItem = React.createClass({
    render: function(){
        var hero = this.props.hero;
        var level = Experience.getLevelByExp(hero.experience);

        return (
            <div className="hero">
                <div className="hero-portrait" />
                <div className="hero-display-name" >
                    <span className="bold">{hero.displayName}</span>
                    <span> - Lvl. {level} {hero.race} {hero.class}</span>
                </div>
            </div>
        );
    }
});

module.exports = HeroesListItem;
