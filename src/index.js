window.propsRegistry = {};

import App from './customComponentTemplate';

App.render();
document.querySelector('#root').appendChild(App.ownTree);

// this function needs to be generic
// take in a selectorID and a componentTree
// to replace the static '#root': string and
// App.ownTree: Node

window.refreshDOM = (selectorID, componentTree) => {
	console.log('hi');
	document
		.querySelector(selectorID)
		.replaceChild(
			componentTree,
			document.querySelector(selectorID).firstElementChild
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
