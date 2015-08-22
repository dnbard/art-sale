var React = require('react');
var PubSub = require('pubsub-js');
var DAL = require('../core/dal')
import Actor from './actor';
import Circle from './ui/circle';

var MainComponent = React.createClass({
    getInitialState: function(){
        return {
            actors: []
        };
    },

    events: [],

    componentWillMount: function(){
        var token = PubSub.subscribe('websocket.subscribed', (event, data) => {
            DAL.getActorsByInstance({
                iid: data.instanceId
            }).then(response => {
                this.setState({
                    actors: response.body
                });
            });
        });
        this.events.push(token);
    },

    componentWillUnmount: function(){
        this.events.forEach(token => PusSub.unsubscribe(token));
        this.events = [];
    },

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
                {this.state.actors.map(a => <Actor key={a._id} size={a.size} x={a.position.x} y={a.position.y} />)}
                <Circle size={200} />
                <Circle size={500} />
                <Circle size={1000} />
                <Circle size={1500} />
            </div>
        );
    }
});

module.exports = MainComponent;
