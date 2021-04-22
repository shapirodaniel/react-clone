import { registry } from './registry';
import { Component } from './component';
import { getRandomHexColorCode } from './helpers';
import { getRandomFact } from './axiosService';

let props = {
	text:
		"hi there! i'm a <span style='color: gold'>random facts generator.</span>",
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
			click me to get a random fact!
		</button>
	</section>
`;
};

const RandomWords = new Component(props, lazyGetOwnHTML);

export default RandomWords;
