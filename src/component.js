import { v4 as uuidv4 } from 'uuid';
import { registry } from './registry';

export class Component {
	constructor(key, props = {}, lazyGetOwnHTML = () => null) {
		this.key = key;
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

	// default componentKey to updaters on this component's props
	// this function returns a string literal with window.propsRegistry declared verbatim
	// important! window.propsRegistry cannot be replaced with ${registry}
	usePropUpdater(funcNameAsString, componentKey = this.key) {
		return `window.propsRegistry['${componentKey}'].${funcNameAsString}('${componentKey}')`;
	}

	embed() {
		this.render();
		return this.ownTree.outerHTML;
	}
}
