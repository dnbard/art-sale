var React = require('react');

var token = document.querySelector('#token').value;
var uid = document.querySelector('#user-id').value;
var ws = new WebSocket(`ws://localhost:3000?token=${token}&uid=${uid}`);

var MainComponent = require('./components/main');

React.render(<MainComponent />, document.querySelector('#app'));
