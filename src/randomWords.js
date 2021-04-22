import { registry } from './registry';
import { Component } from './component';
import { getRandomHexColorCode } from './helpers';

// axiosTestFetch contains logic to emulate useEffect
// network calls to a random facts api are made
// on a regular interval and the component's this.update
// method is called, with a newProps object passed in

import { getRandomFact } from './axiosTestFetch';

let props = {
	text: 'hi there!',
	color: '',

	async updateColorAndText(componentKey) {
		registry[componentKey] = {
			...registry[componentKey],
			text: await getRandomFact(),
			color: getRandomHexColorCode(),
		};

		RandomWords.update(registry[componentKey]);
	},
};

const lazyGetOwnHTML = () => {
	const color = RandomWords.useProp('color');
	const text = RandomWords.useProp('text');
	const updateColorAndText = RandomWords.usePropUpdater('updateColorAndText');

	return `
	<section id='randomFacts'>
		<div style="color: ${color}">
			${text}
		</div>

		<button onclick="${updateColorAndText}">
			click me to change color
		</button>
	</section>
`;
};

const RandomWords = new Component(props, lazyGetOwnHTML);

export default RandomWords;
