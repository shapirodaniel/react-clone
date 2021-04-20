import { v4 as uuidv4 } from 'uuid';

export class Component {
	constructor(state = {}, children = []) {
		this.state = state;
		this.children = children;
		this.isObserving = false;
	}

	// subscribe the children
	subscribe() {
		if (this.children.length)
			this.children.forEach(child => {
				child.isObserving = true;
			});
	}

	// this render method gets invoked to
	// create a doc fragment that can be passed up
	// to the new document in renderDOM()
	renderComponent() {
		let wrapper = document.createElement('div');

		wrapper.setAttribute('key', uuidv4());

		this.children.forEach(child => {
			wrapper.appendChild(child);
		});

		return wrapper;
	}
}
