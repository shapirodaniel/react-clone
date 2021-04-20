import { v4 as uuidv4 } from 'uuid';

export class Component extends BaseComponent {
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
	}

	buildComponentSubtree(newSubtree) {
		let newOwnTree = <div key={this.key}></div>;
		newOwnTree.appendChild(newSubtree);
		return newOwnTree;
	}

	getComponentSubtree() {
		return this.ownTree;
	}

	setComponentSubtree(newSubtree) {
		this.ownTree = this.buildComponentSubtree(newSubtree);
	}

	setProps(newProps) {
		this.props = newProps;
	}

	beforeRender() {}

	render() {
		this.setComponentSubtree(this.jsx);
		return this.getComponentSubtree();
	}
}
