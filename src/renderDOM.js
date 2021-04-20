const parser = new DOMParser();

// driver func
// should assemble components in another document
// and swap the current doc for the new one
export const renderDOM = DOMString => {
	const newDocument = new Document();
	const newDocFragment = parser.parseFromString(DOMString, 'text/html');
	const newDOM = newDocFragment.querySelector('body *');
	newDocument.appendChild(newDOM);
	window.document = newDocument;
};
