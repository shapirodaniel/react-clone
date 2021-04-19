import { parser, areEqualSubtrees } from './comparatorFn';

export class Component {
	constructor(fn, parentElement, children = [], state = {}) {
		this.parent = parentElement;
		this.state = state;
		this.children = children;
		this._fn = fn;
		this.DOMString = '';
		this.handle = {
			// next method async by default
			async next(childDOMString, childKey) {
				if (this.isObserving) {
					// here, we'll locate the child subtree in our parent DOMString
					// childDOMString is the downstream component's this.DOMString prop
					// childKey is the UUID generated as the child's data attribute "key"
					// key is a reserved attribute!

					let thisDOMFragment = parser.parseFromString(this.DOMString);

					const locatedChild = thisDOMFragment.querySelector(
						`data[key="${childKey}"]`
					);

					const newChildDOMFragment = parser.parseFromString(childDOMString);

					// hack until i find out how to just generate the
					// childDOMString without having it attached to
					// a doc fragment's <body />
					const newChild = newChildDOMFragment.querySelector('body *');

					// do nothing if child hasn't changed
					if (locatedChild.isEqualNode(newChild)) return;

					// otherwise, replace the child
					thisDOMFragment.replaceChild(newChild, locatedChild);

					// grab this component's updatedDOMString and set
					const updatedDOMString = thisDOMFragment.querySelector('body *')
						.innerHTML;

					// assign this component's key -> UUID here?? or elsewhere

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
			isObserving: false,
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
		this.parent.handle.next(this.DOMString);
	}
}

// triggering renders downstream
// child subscribes to parent and listens for
// DOMString changes

// if every element has a UUID
// we can compare elements by generating
// parent tree and locating child in subtree to check for changes
