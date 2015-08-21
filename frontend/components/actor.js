var React = require('react');
var CameraProvider = require('../providers/camera');

var Actor = React.createClass({
    getInitialState: function(){
        return {
            x: this.props.x || 0,
            y: this.props.y || 0
        };
    },

    componentDidMount: function(){
//        setInterval(() => {
//            this.setState({
//                x: this.state.x + 1,
//                y: this.state.y + 1
//            });
//        }, 100);
    },

    render: function(){
        var cameraOffset = CameraProvider.getOffset(),
            halfSize = this.props.size * 0.5,
            styles = {
                transform: `translate(${this.state.x - halfSize + cameraOffset.x}px, ${this.state.y - halfSize + cameraOffset.y}px)`,
                width: this.props.size,
                height: this.props.size
            };

        return (
            <div className="actor" style={styles}>
                <div className="actor__visual-top"></div>
                <div className="actor__visual-left"></div>
                <div className="actor__visual-bottom"></div>
                <div className="actor__visual-right"></div>
            </div>
        );
    }
});

module.exports = Actor;
