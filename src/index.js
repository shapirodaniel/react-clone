import App from './customComponentTemplate';

App.render();

(() => {
	document.querySelector('#root').appendChild(App.ownTree);
})();

const refreshDOM = () => {
	console.log('hi');
	document
		.querySelector('#root')
		.replaceChild(
			App.ownTree,
			document.querySelector('#root').firstElementChild
		);
};

setInterval(refreshDOM, 1000);

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
};

setInterval(fakeUpdater, 10000);
