import App from './customComponentTemplate';

// axiosTestFetch contains logic to emulate useEffect
// network calls to a random facts api are made
// on a regular interval and the component's this.update
// method is called, with a newProps object passed in

import './axiosTestFetch.js';

// this iife isn't really necessary, it just binds the
// init functionality together so we can see how
// everything gets going: first the window.propsRegistry
// is created -- note, we could call it from
// localStorage to prevent the app state being erased
// on page refresh -- then the top-level component is rendered
// and attached to its parent

// we're agnostic about the parentId, it could be "root", "app"
// anything that works as an elementId is fine
// does not need to be (and really probably should not be) a uuid

(() => {
	window.propsRegistry = {};
	App.render();
	document.querySelector(App.parentId).appendChild(App.ownTree);
})();

// here we assign a refreshDOM method to the window
// it will take a component's this.parentId and this.ownTree,
// query the DOM, and replace the component instance

window.refreshDOM = (componentParentId, componentTree) => {
	document
		.querySelector(componentParentId)
		.replaceChild(
			componentTree,
			document.querySelector(componentParentId).firstElementChild
		);
};
