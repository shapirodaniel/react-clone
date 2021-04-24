// window.propsRegistry holds component props objects
window.propsRegistry = {};

window.refreshDOM = (componentKey, componentTree) => {
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

export const { propsRegistry, refreshDOM } = window;
