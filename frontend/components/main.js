var React = require('react');
import Actor from './actor';
import Circle from './ui/circle';

var MainComponent = React.createClass({
    render: function(){
        var background = {
            background: "url(https://gate.eveonline.com/Content/images/crucible.jpg)",
            display: 'inline-block',
            position: 'absolute',
            width: '100%',
            height: '100%'
        };

        return (
            <div className="application container">
                <div style={background}></div>
                <Actor size={20} />
                <Actor size={20} x={50} y={88} />
                <Circle size={200} />
                <Circle size={500} />
                <Circle size={1000} />
                <Circle size={1500} />
            </div>
        );
    }
});

module.exports = MainComponent;
