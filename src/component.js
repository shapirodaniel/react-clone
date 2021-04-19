import { parser, areEqualSubtrees } from './comparatorFn';

export class Component {
	constructor(fn, parentElement, children = [], state = {}) {
		this.parent = parentElement;
		this.state = state;
		this.children = children;
		this._fn = fn;
		this.handle = {
			// next method async by default
			async next(data) {
				if (this.isObserving) {
					// early return if no changes
					if (areEqualSubtrees(this.DOMString, data)) {
						return;
					}

					this.DOMString = data;
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
		this.DOMString = '';
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

	// render method called with new subtree
	// invokes handle.next() to swap
	render() {
		const fragment = parser.parseFromString(this.DOMString);

		// hack until i figure out how to just create
		// the DOMString subtree and not a full document
		// with DOMString subtree inserted at <body />
		return fragment.querySelector('body *');
	}
}

// now we can dive in the rabbit hole
//
