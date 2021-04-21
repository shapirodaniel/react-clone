import { Component } from './component';
import { getRandomHexColorCode } from './helpers';

/*

	here we create a custom component instance by importing
	and calling the Component constructor and feeding it

	1. parentId: String

	the parentId string is a CSS selector string
	that is used by window.refreshDOM to replace
	the Component instance whenever it's rendered

	2. props: Object

	the props object can essentially be whatever you like

	when the Component constructor is called,
	the component instance is initialized so that
	this.shouldUpdate = true, which makes sure that
	the first this.render() call builds this.ownTree

	props updaters must call this.update() and
	pass in the window.propsRegistry[componentKey] value

	3. lazyGetOwnHTML: Function

	the lazyGetOwnHTML function returns the markup will
	be appended to a parent container in this.buildComponentTree
	and set as this.ownTree

	****

	what's new and potentially very cool about this?

	window.propsRegistry is an open secret --
	any component that has a Component instance key can
	access and modify that component's props

	it's kind of the best of the Context world +
	locally-scoped props that can be inherited -- except,
	inheriting or prop-drilling can now be accomplished
	through simple lookups to window.propsRegistry

	remains to be seen if we'll need a Redux-like system
	to guarantee that operations can be handled sequentially
	even if there's a network call that might take time

*/

let props = {
	text: 'hi there!',
	color: '',
	updateColor(componentKey) {
		// always spread the propsRegistry instance
		// to avoid overwriting state
		window.propsRegistry[componentKey] = {
			...window.propsRegistry[componentKey],
			color: getRandomHexColorCode(),
		};

		// always call the component instance's update()
		// method and pass in the window.propsRegistry[componentKey]
		App.update(window.propsRegistry[componentKey]);
	},
};

// vscode es6-string-html formatting is available
// preface with /* html */ and wrap with backticks
// note this is ** not ** jsx!
// template literals necessary to interpolate expressions

// local props instance can be used for any expression literals
// lazily-evaluated expressions need to reference window.propsRegistry
// since the element doesn't have access to the closure on this file
// after being rendered and attached to the DOM

// important!
// App.key isn't available until the Component constructor has been called
// that's why we feed lazyGetOwnHTML a componentKey param here
// it will be called by the new Component instance
// in this.buildComponentTree -> this.lazyGetOwnHTML(this.key)

const lazyGetOwnHTML = componentKey => `
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
	* used by refreshDOM to locate and replace the component on renders

	2. props: object
	* added window.propsRegistry by component.key (uuid)

	3. lazyGetOwnHTML: function
	* returns the component instance's innerHTML string
	* lazy evaluation allows us to use the latest props values

*/

const App = new Component('#root', props, lazyGetOwnHTML);

export default App;
