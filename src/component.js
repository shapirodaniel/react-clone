import { compareDOMStrings } from './comparatorFn';
import { v4 as uuidv4 } from 'uuid';

export class Component {
	constructor(fn, parentElement, children = [], state = {}) {
		this.parent = parentElement;
		this.key = uuidv4();
		this.state = state;
		this.children = children;
		this._fn = fn;
		this.DOMString = '';
		this.isObserving = false;
		this.handle = {
			// next method async by default
			async next(parentDOMString, childDOMString, childKey) {
				if (this.isObserving) {
					const updatedDOMString = compareDOMStrings(
						parentDOMString,
						childDOMString,
						childKey
					);

					this.setDOMString(updatedDOMString);
				}
			},
			error(err) {
				console.error(err);
			},
			// rather than pass an observable we'll
			// just stop subscribing to the parent element
			// since any data this component fetches
			// will be on its state
			complete() {
				this.parent.unsubscribe(this);
			},
		};
	}

	// pass Component's handle object to subscribe fn
	// this allows child methods to be invoked when Component changes
	// and set child isObserving flag to true
	subscribe(child) {
		child.isObserving = true;
		this._fn(child.handle);
	}

	// set child isObserving flag to false to unsubscribe
	unsubscribe(child) {
		child.isObserving = false;
	}

	setDOMString(newDOMString) {
		this.DOMString = newDOMString;
	}

	render() {
		this.parent.handle.next(this.parent.DOMString, this.DOMString, this.key);
	}
}

// triggering renders downstream
// child subscribes to parent and listens for
// DOMString changes

// if every element has a UUID
// we can compare elements by generating
// parent tree and locating child in subtree to check for changes
