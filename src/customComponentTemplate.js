import { Component } from './component';
import { getRandomHexColorCode } from './helpers';

let localState = {};

// for now,  updaters
// need to take a componentKey
// this will allow the updater to overwrite
// the  instance in the Registry
// and access those  on the component instance.update()

let props = {
	text: 'hi there!',
	color: '',
	updateColor(componentKey) {
		window.propsRegistry[componentKey] = {
			...window.propsRegistry[componentKey],
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

// local  instance can be used for any expression literals
// lazily-evaluated expressions need to reference window.Registry
// since the element doesn't have access to the closure on this file
// after being rendered and attached to the DOM

const lazyGetOwnHTML = componentKey => /*  */ `
	<section id='appSection'>
		<div style="color: ${
			window.propsRegistry && window.propsRegistry[componentKey]
				? window.propsRegistry[componentKey].color
				: props.color
		}">
			${
				window.propsRegistry && window.propsRegistry[componentKey]
					? window.propsRegistry[componentKey].text
					: props.text
			}
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

	2. : object
	* attached to window.Registry object by Component.key (uuid)

	3. HTML generator: function
	* returns an innerHTML string with interpolated  values

*/

const App = new Component('#root', props, lazyGetOwnHTML);

// for now, each line is absolutely necessary in App.update()
// first, set this local  to new
// second, set  from the updated local  on the component
// then set shouldUpdate to true so that next render() does work

// would like to decouple the local version of
// so that we're only ever referencing the window.Registry version

export default App;
