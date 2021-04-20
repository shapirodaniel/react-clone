import { v4 as uuidv4 } from 'uuid';

export class Component {
	constructor(
		key = uuidv4(),
		ownTree = <div key={key}></div>,
		props = {},
		lazyGetJSX = () => null
	) {
		this.key = key;
		this.ownTree = ownTree;
		this.props = props;
		this.jsx = lazyGetJSX();
		this.shouldUpdate = false;
	}

	buildComponentTree(newTree) {
		let newRoot = <div key={this.key}></div>;
		newRoot.appendChild(newTree);
		this.ownTree = newRoot;
	}

	setProps(newProps) {
		this.props = newProps;
	}

	beforeRender() {}

	// render method will be called continuously
	// shouldUpdate flag will have been set for any
	// component whose incoming data (props) have changed
	// or whose jsx has changed
	render() {
		if (this.shouldUpdate) {
			this.buildComponentTree(this.jsx);
			this.shouldUpdate = false;
			return this.ownTree;
		}
	}
}
