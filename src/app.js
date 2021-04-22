import { registry } from './registry';
import { Component } from './component';
import { getRandomHexColorCode } from './helpers';
import { v4 as uuidv4 } from 'uuid';

import Textarea from './textarea';

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
	// prop updaters take a componentKey
	// so that any component's updater can be used
	// to (re-)assign the props of any other component
	updateColor(componentKey) {
		// always spread the propsRegistry instance
		// to avoid overwriting state
		registry[componentKey] = {
			...registry[componentKey],
			color: getRandomHexColorCode(),
		};

		// always call the component instance's update()
		// method and pass in the registry[componentKey]
		App.update(registry[componentKey]);
	},
};

// lazyGetOwnHTML uses the to-be-declared Component instance
// to access the above-declared props, which will have been
// registered with window.propsRegistry when component is
// first rendered

// useProp returns this.props values
// usePropUpdater returns this.props updater functions that modify this.props values
const lazyGetOwnHTML = () => {
	const color = App.useProp('color');
	const text = App.useProp('text');
	const updateColor = App.usePropUpdater('updateColor');

	return `
	<section id='appSection'>
		<div style="color: ${color}">
			${text}
		</div>

		<button onclick="${updateColor}">
			click me to change color
		</button>

		${Textarea.embed(appKey)}
	</section>
`;
};

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

const appKey = uuidv4();

const App = new Component(appKey, props, lazyGetOwnHTML);

export default App;
