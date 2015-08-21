var React = require('react');
var CameraProvider = require('../../providers/camera');

var Circle = React.createClass({
    render: function(){
        var cameraOffset = CameraProvider.getOffset(),
            halfSize = this.props.size * 0.5,
            styles = {
                transform: `translate(${cameraOffset.x - halfSize}px, ${cameraOffset.y - halfSize}px)`,
                width: this.props.size,
                height: this.props.size
            }, labelStyles = {
                transform: `translate(${this.props.size + 5}px, ${halfSize - 15}px)`,
            };

        return (
            <div className="ui-circle" style={styles}>
                <div className="ui-circle__label" style={labelStyles}>{halfSize}</div>
            </div>
        );
    }
});

module.exports = Circle;
