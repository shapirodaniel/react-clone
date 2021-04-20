import { Component } from './component';

let localState = {};

let props = {
	text: 'hi there!',
};

let previousProps = props;

// vscode es6-string-html formatting
// preface with /* html */ and wrap with backticks
// note this is ** not ** jsx!
// template literals necessary to interpolate expressions
const lazyGetOwnHTML = () => /* html */ `<div>${props.text}</div>`;

// third arg is shouldUpdate
// initialize as true to trigger immediate render
// note: after each render, shouldUpdate is set to false
const App = new Component(props, lazyGetOwnHTML, true);

App.update = function (newProps) {
	if (newProps) {
		props = newProps;
		this.setProps(props);
		this.shouldUpdate = true;
	}
};

while (true) {
	if (props !== previousProps) {
		previousProps = props;
		App.update(props);
		App.render();
	}
}

export default App;
