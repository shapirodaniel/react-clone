// first import supresses a parcel typeerror
import 'regenerator-runtime/runtime';

// './registry' exports { registry } which is window.propsRegistry = {}
// we should probably save the registry to localStorage any time
// window.unload is called, to prevent the app state from being erased
// on page refresh

import './registry';

// here we assign a refreshDOM method to the window
// it will take a component's this.parentId and this.ownTree,
// query the DOM, and replace the component instance

window.refreshDOM = (componentKey, componentTree) => {
	// grab component in DOM by componentKey
	const componentToBeReplaced = document.querySelector(
		`div[key="${componentKey}"]`
	);

	// if component has a parent, replace it
	// else it's the top level component
	// grab the "root" element and replace the component
	componentToBeReplaced.parentNode
		? componentToBeReplaced.parentNode.replaceChild(
				componentTree,
				componentToBeReplaced
		  )
		: document
				.querySelector('#root')
				.replaceChild(componentTree, componentToBeReplaced);
};

// the top-level component is imported
// and rendered after the next import statement

import App from './app';

// the top-level parentId is '#root' in this case
// could be whatever we like

App.render();
document.querySelector('#root').appendChild(App.ownTree);
