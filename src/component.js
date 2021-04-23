import { registry } from './registry';
import { v4 as uuidv4 } from 'uuid';

export class Component {
	constructor(props = {}, lazyGetOwnHTML = () => null) {
		this.key = uuidv4();
		this.props = props;
		this.lazyGetOwnHTML = lazyGetOwnHTML;
		this.ownTree;
		// initialized as true so that component
		// is immediately rendered
		this.shouldUpdate = true;
	}

	buildComponentTree() {
		// assign props to registry
		// this will allow updated props
		// to be used to build lazyGetOwnHTML
		registry[this.key] = this.props;

		// every component tree is built on a
		// root div with attribute key = this.key
		// this allows refreshDOM to locate the component
		// in the DOM and replace it on renders
		let newRoot = document.createElement('div');
		newRoot.setAttribute('key', this.key);
		newRoot.innerHTML = this.lazyGetOwnHTML();

		this.ownTree = newRoot;
	}

	// render method called by this.update()
	render() {
		if (!this.shouldUpdate) return;

		this.buildComponentTree();
		this.shouldUpdate = false;
	}

	// update method builds an updated component tree
	// and replaces the component in the DOM
	update(newProps) {
		this.props = newProps;
		this.shouldUpdate = true;
		this.render();
		window.refreshDOM(this.key, this.ownTree);
	}

	useProp(propNameAsString) {
		return registry && registry[this.key]
			? registry[this.key][propNameAsString]
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

	// if component instance is a child,
	// this function should be used to embed its outerHTML
	// in its parent component's lazyGetOwnHTML() markup
	// optional newProps argument
	// allows component instance to "borrow" ie copy props
	// from another component instance
	embed(newProps) {
		if (newProps) {
			this.props = newProps;
			this.shouldUpdate = true;
		}

		this.render();
		return this.ownTree.outerHTML;
	}
}
