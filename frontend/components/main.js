var React = require('react'),
    DAL = require('../core/dal'),
    uuid = require('node-uuid').v4;

var userId = document.querySelector('#user-id').value;
document.querySelector('#user-id').value = uuid();

module.exports = React.createClass({
    componentDidMount: function(){
        DAL.getUserById({ id: userId })
            .then((r) => {
                debugger;
            }).catch((r) => {
                debugger;
            });
    },

    render: function(){
        return (<div className='AAA'/>);
    }
});
