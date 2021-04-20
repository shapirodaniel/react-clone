import App from './customComponentTemplate';

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

// first import supresses a parcel typeerror
import 'regenerator-runtime/runtime';
import axios from 'axios';

// fetch data from random facts api
let currentData = async () => {
	const { data } = await axios.get(
		'https://uselessfacts.jsph.pl/random.json?language=en'
	);
	return data.text.replace(/\\/gi, '');
};

const fakeUpdater = async () => {
	App.update({ ...App.props, text: await currentData() });
	App.render();
	window.refreshDOM('#root', App.ownTree);
};

setInterval(fakeUpdater, 10000);
