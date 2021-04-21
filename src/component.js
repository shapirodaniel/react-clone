import { v4 as uuidv4 } from 'uuid';

export class Component {
	constructor(parentId, props = {}, lazyGetOwnHTML = () => null) {
		this.parentId = parentId;
		this.props = props;
		this.lazyGetOwnHTML = lazyGetOwnHTML;
		this.key = uuidv4();
		this.ownTree;

		// initialized as true so that component
		// is immediately rendered
		this.shouldUpdate = true;
	}

	buildComponentTree() {
		// assign props to window.propsRegistry
		// this will allow updated props
		// to be used to build lazyGetOwnHTML
		window.propsRegistry[this.key] = this.props;

		// every component tree is built on a
		// root div with attribute key = this.key
		// this allows refreshDOM to locate the component
		// in the DOM and replace it on renders
		let newRoot = document.createElement('div');
		newRoot.setAttribute('key', this.key);
		newRoot.innerHTML = this.lazyGetOwnHTML(this.key);

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
		window.refreshDOM(this.parentId, this.ownTree);
	}
}
