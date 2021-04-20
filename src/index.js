import App from './customComponentTemplate';

// axiosTestFetch
import './axiosTestFetch.js';

(() => {
	window.propsRegistry = {};
	App.render();
	document.querySelector('#root').appendChild(App.ownTree);
})();

// assign refreshDOM fn to window
// takes 2 args:
// Component.parentId: string
// Component.ownTree: Node (NOT a DOMString)
window.refreshDOM = (componentParentId, componentTree) => {
	console.log('hi');
	document
		.querySelector(componentParentId)
		.replaceChild(
			componentTree,
			document.querySelector(componentParentId).firstElementChild
		);
};
