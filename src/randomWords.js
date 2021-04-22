import { registry } from './registry';
import { Component } from './component';
import { getRandomHexColorCode } from './helpers';
import { v4 as uuidv4 } from 'uuid';

let props = {
	text: 'hi there!',
	color: '',

	updateColor(componentKey) {
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
	const updateColor = RandomWords.usePropUpdater('updateColor');

	return `
	<section id='appSection'>
		<div style="color: ${color}">
			${text}
		</div>

		<button onclick="${updateColor}">
			click me to change color
		</button>

		${Textarea.embed()}
	</section>
`;
};

const randomWordsKey = uuidv4();

const RandomWords = new Component(props, lazyGetOwnHTML);

export default RandomWords;
