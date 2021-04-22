// './registry' exports { registry } which is window.propsRegistry = {}
// we should probably save the registry to localStorage any time
// window.unload is called, to prevent the app state from being erased
// on page refresh

import './registry';

// the top-level component is imported
// and rendered after the next import statement

import App from './app';

// axiosTestFetch contains logic to emulate useEffect
// network calls to a random facts api are made
// on a regular interval and the component's this.update
// method is called, with a newProps object passed in

import './axiosTestFetch.js';

// the top-level parentId is '#root' in this case
// could be whatever we like

App.render();
document.querySelector(App.parentId).appendChild(App.ownTree);

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
