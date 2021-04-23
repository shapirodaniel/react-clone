import { registry } from './registry';
import { Component } from './component';
import { getRandomHexColorCode } from './helpers';
import { getRandomFact } from './axiosService';

import App from './app';

let props = {
	text:
		"hi there! i'm a <span style='color: gold'>random facts generator.</span>",

	color: '',

	async updateText(componentKey, data) {
		registry[componentKey] = {
			...registry[componentKey],
			text: data ? data : await getRandomFact(),
		};

		RandomWords.update(registry[componentKey]);
	},

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

	// passed in from app.js through embed props modifier
	// usePropUpdater takes an optional second arg --
	// the componentKey that the function should be executed with
	// this allows child components to update props on parent components
	// where a function has been "borrowed", ie copied to the child props
	// from the parent's propsRegistry instance
	const hideBanner = RandomWords.usePropUpdater('hideBanner', App.key);

	const updateText = RandomWords.usePropUpdater('updateText');
	const updateColor = RandomWords.usePropUpdater('updateColor');

	// important!
	// to call multiple lines of code in an onclick handler
	// use "{ myCodeHere ... }"
	// brackets block-scope the contents of the onclick fn

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
			<button onclick="{
				${updateText};
				${hideBanner};
			}">
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
