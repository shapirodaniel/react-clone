export const parser = new DOMParser();

// build the fragments and compare
// return a boolean
export const areEqualSubtrees = (DOMStringA, DOMStringB) => {
	const a = parser.parseFromString(DOMStringA);
	const b = parser.parseFromString(DOMStringB);
	return a.isEqualNode(b);
};
