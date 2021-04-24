import { propsRegistry, refreshDOM } from './window';
import { v4 as uuidv4 } from 'uuid';

export class Component {
	constructor(props = {}, lazyGetOwnHTML = () => null) {
		this.key = uuidv4();
		this.props = props;
		this.lazyGetOwnHTML = lazyGetOwnHTML;
		this.ownTree;
	}

	buildComponentTree() {
		// assign props to propsRegistry
		// this will allow updated props
		// to be used to build lazyGetOwnHTML
		propsRegistry[this.key] = this.props;

		// every component tree is built on a
		// root div with attribute key = this.key
		// this allows refreshDOM to locate the component
		// in the DOM and replace it on renders
		let newRoot = document.createElement('div');
		newRoot.setAttribute('key', this.key);
		newRoot.innerHTML = this.lazyGetOwnHTML();

		this.ownTree = newRoot;
	}

	// update method should be called inside any prop updater fn on this.props
	update(newProps) {
		this.props = newProps;
		this.buildComponentTree();
		refreshDOM(this.key, this.ownTree);
	}

	useProp(propNameAsString) {
		return propsRegistry && propsRegistry[this.key]
			? propsRegistry[this.key][propNameAsString]
			: this.props[propNameAsString];
	}

	// this fn takes a string repr of a fn expression name,
	// a componentKey, and any number of optional args
	// and embeds the event listener directly in the element
	usePropUpdater(funcNameAsString, componentKey = this.key) {
		// data allows us to pass any arguments we like into this fn
		// we'll map, stringify, and join them to setup the eventListener
		const data = Array.from(arguments).slice(2);

		const command = `window.propsRegistry['${componentKey}'].${funcNameAsString}(${
			data.length
				? `'${componentKey}'` + `${data.map(arg => `, '${arg}'`).join('')}`
				: `'${componentKey}'`
		})`;

		return command;
	}

	// (all but the top-level component)
	// this function should be used to embed the component's outerHTML
	// in its parent component's lazyGetOwnHTML() markup
	// optional newProps argument allows component instance to "borrow",
	// ie copy props from another component instance
	embed(newProps) {
		if (newProps) {
			this.props = newProps;
		}

		this.buildComponentTree();
		return this.ownTree.outerHTML;
	}
}
