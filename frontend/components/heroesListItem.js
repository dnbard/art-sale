var React = require('react');

var HeroesListItem = React.createClass({
    render: function(){
        return (
            <div className="hero">
                <div className="hero-portrait" />
            </div>
        );
    }
});

module.exports = HeroesListItem;
