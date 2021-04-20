import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'dompurify';
const parser = new DOMParser();

export class Component {
	constructor(parentId, props = {}, lazyGetOwnHTML = () => null) {
		this.props = props;
		this.lazyGetOwnHTML = lazyGetOwnHTML;
		this.key = uuidv4();
		this.ownTree;
		this.shouldUpdate = true;
		this.parentId = parentId;
	}

	buildComponentTree() {
		// update props on window
		// this will allow updated props
		// to be used to build lazyGetOwnHTML
		window.propsRegistry[this.key] = this.props;

		let newRoot = document.createElement('div');
		newRoot.setAttribute('key', this.key);

		let newOwnHTML = parser.parseFromString(this.lazyGetOwnHTML(), 'text/html');

		newOwnHTML = newOwnHTML.querySelector('body *');

		// would like to purify this but dompurify removes
		// event handlers from the generated html
		// probably configurable within dompurify
		newRoot.innerHTML = this.lazyGetOwnHTML();

		this.ownTree = newRoot;
	}

	setProps(newProps) {
		this.props = newProps;
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
