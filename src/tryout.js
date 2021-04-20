import { Component } from './component';

let localState = {};

let props = {
	text: 'hi there!',
};

const lazyGetOwnHTML = () => `<div>${props.text}</div>`;

// third arg is shouldUpdate
// initialize as true to trigger immediate render
// note: after each render, shouldUpdate is set to false
const App = new Component(props, lazyGetOwnHTML, true);

App.update = function (newProps) {
	if (newProps) {
		props = newProps;
		this.setProps(props);
	}
	this.shouldUpdate = true;
};

// how does the updater get called?

export default App;
