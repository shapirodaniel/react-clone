import { Component } from './component';
import { getRandomHexColorCode } from './helpers';

let localState = {};

// for now, props updaters
// need to take a componentKey
// this will allow the updater to overwrite
// the props instance in the propsRegistry
// and access those props on the component instance.update()

let props = {
	text: '',
	color: '',
	updateColor(componentKey) {
		window.propsRegistry[componentKey] = {
			...App.props,
			color: getRandomHexColorCode(),
		};

		App.update(window.propsRegistry[componentKey]);
		App.render();

		window.refreshDOM('#root', App.ownTree);
	},
};

// vscode es6-string-html formatting
// preface with /* html */ and wrap with backticks
// note this is ** not ** jsx!
// template literals necessary to interpolate expressions

// local props instance can be used for any expression literals
// lazily-evaluated expressions need to reference window.propsRegistry
// since the element doesn't have access to the closure on this file
// after being rendered and attached to the DOM

const lazyGetOwnHTML = componentKey => /* html */ `
	<section id='appSection'>
		<div style="color: ${props.color}">
			${props.text ? props.text : 'hi there!'}
		</div>
		<button onclick="window.propsRegistry['${componentKey}'].updateColor('${componentKey}')">
			click me to change color
		</button>
	</section>
`;

/*

	Component params:

	1. parentId: string
	* used by refreshDOM

	2. props: object
	* attached to window.propsRegistry object by Component.key (uuid)

	3. HTML generator: function
	* returns an innerHTML string with interpolated props values

*/

const App = new Component('#root', props, lazyGetOwnHTML);

// for now, each line is absolutely necessary in App.update()
// first, set this local props to newProps
// second, set props from the updated local props on the component
// then set shouldUpdate to true so that next render() does work

// would like to decouple the local version of props
// so that we're only ever referencing the window.propsRegistry version

App.update = function (newProps) {
	props = newProps;
	this.setProps(props);
	this.shouldUpdate = true;
};

export default App;
