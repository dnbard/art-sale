var React = require('react');
var Header = require('./header');

var MainComponent = React.createClass({
    render: function(){
        return (
            <div className="application">
                <Header />
            </div>
        );
    }
});

module.exports = MainComponent;
