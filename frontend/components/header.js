var React = require('react');
var UserStore = require('../stores/user');

var Header = React.createClass({
    getInitialState() {
        return UserStore.getState();
    },

    componentDidMount: function(){
        UserStore.listen(this.onChange);
    },
    componentWillUnmount: function(){
        UserStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
        console.log(state);
    },

    render: function(){
        if (!this.state.user){
            return (<header></header>);
        }

        return (
            <header>
                <div className="user-name">{this.state.user.displayName}</div>
            </header>
       );
    }
});

module.exports = Header;
