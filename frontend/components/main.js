var React = require('react');
var Header = require('./header');
var HeroesList = require('./heroesList');

var MainComponent = React.createClass({
    render: function(){
        return (
            <div className="application container">
                <Header />
                <HeroesList />
            </div>
        );
    }
});

module.exports = MainComponent;
