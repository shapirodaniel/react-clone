import { propsRegistry } from './window';
import { Component } from './component';
import { getRandomFact } from './axiosService';

let props = {
	numFactsSeen: 0,
	text:
		"hi there! i'm a <span style='color: var(--lightInner);'>random facts generator.</span>",

	async updateText(componentKey, data) {
		propsRegistry[componentKey] = {
			...propsRegistry[componentKey],
			text: data ? data : await getRandomFact(),
			numFactsSeen: ++this.numFactsSeen,
		};

		RandomWords.update(propsRegistry[componentKey]);
	},
};

const markup = () => {
	const numFactsSeen = RandomWords.useProp('numFactsSeen');
	const text = RandomWords.useProp('text');
	const updateText = RandomWords.usePropUpdater('updateText');

	return `
	<section id='randomFacts'>

		<div>${text}</div>

		<button onclick="${updateText};">
			click me to get a random fact!
		</button>

		<div>Facts requested: ${numFactsSeen}</div>

	</section>
`;
};

const RandomWords = new Component(props, markup);

export default RandomWords;
