import { v4 as uuidv4 } from 'uuid';

// components take a childData array and a children array
// childData is an array of props for children
// each prop is an object with name, payload

/*
	childData = [
		{
			name: string,
			payload: any
		},
		...
	]
*/

export class Component {
	constructor(childData = [], children = []) {
		this.childData = childData;
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
	// create a DOM subtree that can be passed up
	// to the new document in renderDOM()
	buildComponentSubtree() {
		let wrapper = document.createElement('div');

		wrapper.setAttribute('key', uuidv4());

		this.children.forEach(child => {
			// update child props
			const newProps = this.childData.find(
				propObject => propObject.name === child.props.name
			);

			child.props = newProps;

			wrapper.appendChild(child);
		});

		return wrapper;
	}

	// this method is the hook that re-renders the component
	// whenever its previousChildData, ie its childData
	updateIfChildDataChanged(incomingChildData) {
		// if child data hasn't changed, ignore it
		if (
			incomingChildData.every(
				(child, idx) =>
					JSON.stringify(child) === JSON.stringify(this.childData[idx])
			)
		) {
			return;
		}

		this.childData = incomingChildData;
		this.buildComponentSubtree();
	}
}
