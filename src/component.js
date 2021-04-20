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
		// update props on window
		// this will allow updated props
		// to be used to build lazyGetOwnHTML
		window.propsRegistry[this.key] = this.props;

		let newRoot = document.createElement('div');
		newRoot.setAttribute('key', this.key);
		newRoot.innerHTML = this.lazyGetOwnHTML(this.key);

		this.ownTree = newRoot;
	}

	update(newProps) {
		this.props = newProps;
		this.shouldUpdate = true;
	}

	// render method will be called continuously
	// shouldUpdate flag will have been set for any
	// component whose incoming data (props) have changed
	// or whose lazyGetOwnHTML has changed
	render() {
		if (!this.shouldUpdate) return;

		this.buildComponentTree();
		this.shouldUpdate = false;
		return this.ownTree;
	}
}
