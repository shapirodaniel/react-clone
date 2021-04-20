import { Component } from './component';
import { getRandomHexColorCode } from './helpers';

let localState = {};

let props = {
	text: '',
	color: '',
	updateColor() {
		window.props = { ...App.props, color: getRandomHexColorCode() };
		App.update(window.props);
		App.render();
		window.refreshDOM('#root', App.ownTree);
	},
};

window.props = props;

// vscode es6-string-html formatting
// preface with /* html */ and wrap with backticks
// note this is ** not ** jsx!
// template literals necessary to interpolate expressions
const lazyGetOwnHTML = () => /* html */ `
	<section id='appSection'>
		<div style="color: ${props.color}">
			${props.text ? props.text : 'hi there!'}
		</div>
		<button onclick="window.props.updateColor()">
			click me to change color
		</button>
	</section>
`;

/*
	Component params:

	1. parentId: string
	2. props: object
	3. HTML generator: function
*/

const App = new Component('#root', props, lazyGetOwnHTML);

App.update = function (newProps) {
	if (newProps) {
		props = newProps;
		this.setProps(props);
		this.shouldUpdate = true;
	}
};

export default App;
