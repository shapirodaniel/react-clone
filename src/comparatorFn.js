export const parser = new DOMParser();

// here, we'll locate the child subtree in our parent DOMString
// childDOMString is the downstream component's this.DOMString prop
// childKey is the UUID generated as the child's data attribute "key"
// key is a reserved attribute!

// assign this component's key -> UUID in the actual
// component instance, since we don't know the makeup of
// the component yet -- only that the UUID will be the data[key=UUID]
// attribute we'll be selecting by, and that it flags the
// top-level element

// expects: parent's DOMString (this.DOMString), childDOMString
export const compareDOMStrings = (
	parentDOMString,
	childDOMString,
	childKey
) => {
	const parentDOMFragment = parser.parseFromString(parentDOMString);

	const locatedChild = parentDOMFragment.querySelector(
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
	parentDOMFragment.replaceChild(newChild, locatedChild);

	// grab this component's updatedDOMString and set
	const updatedDOMString = parentDOMFragment.querySelector('body *').innerHTML;

	return updatedDOMString;
};
