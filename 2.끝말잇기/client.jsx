const React = require('react');
const ReactDOM = require('react-dom');
const {hot} = require('react-hot-loader/root');

const WordRelayClass = require('./WordRelay');
const WordRelayHooks = require('./WordRelay');

const Hot = hot(WordRelayClass); //hoc
const Hot1 = hot(WordRelayHooks); 

ReactDOM.render(<Hot />, document.querySelector('#class'));
ReactDOM.render(<Hot1 />, document.querySelector('#hooks'));