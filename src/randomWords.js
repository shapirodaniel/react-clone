import { registry } from './registry';
import { Component } from './component';
import { getRandomHexColorCode } from './helpers';
import { getRandomFact } from './axiosService';

let props = {
	text:
		"hi there! i'm a <span style='color: gold'>random facts generator.</span>",
	color: '',

	async updateText(componentKey = RandomWords.key) {
		registry[componentKey] = {
			...registry[componentKey],
			text: await getRandomFact(),
		};

		RandomWords.update(registry[componentKey]);
	},

	updateColor(componentKey = RandomWords.key) {
		registry[componentKey] = {
			...registry[componentKey],
			color: getRandomHexColorCode(),
		};

		RandomWords.update(registry[componentKey]);
	},
};

const lazyGetOwnHTML = () => {
	const color = RandomWords.useProp('color');
	const text = RandomWords.useProp('text');
	const updateText = RandomWords.usePropUpdater('updateText');
	const updateColor = RandomWords.usePropUpdater('updateColor');

	return `
	<section id='randomFacts'>
		<div style="color: ${color}">
			${text}
		</div>

		<div
			style=
				"display: flex;
				 width: 500px;
				 align-items: center;
				 justify-content: space-around;"
		>
			<button onclick="${updateText}">
				click me to get a random fact!
			</button>

			<button onclick="${updateColor}">
				click me to change text colors!
			</button>
		</div>
	</section>
`;
};

const RandomWords = new Component(props, lazyGetOwnHTML);

export default RandomWords;
