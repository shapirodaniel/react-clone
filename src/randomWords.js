import { registry } from './registry';
import { Component } from './component';
import { getRandomHexColorCode } from './helpers';
import { getRandomFact } from './axiosService';

import App from './app';

/*

	we should define two function creators

	1. access, modify, update from thisComponent's propsRegistry instance this will be structured in the way the below updateColor works

	const updateColor(componentKey = ComponentInstance.key) {
		registry[componentKey] = {
			...registry[componentKey],
			value: doSomething()
		}

		ComponentInstance.update(registry[componentKey])
	}

	2. access another component's registry and copy a value to this registry or use an updater to modify a value in this registry

	const borrowUpdateText(sourceKey, funcNameAsString) {
		registry[ComponentInstance.key] = {
			...registry[ComponentInstance.key],
			text: registry[sourceKey][funcNameAsString](...args)
		}

		ComponentInstance.update(registry[ComponentInstance.key])
	}

*/

let props = {
	text:
		"hi there! i'm a <span style='color: gold'>random facts generator.</span>",
	color: '',

	alreadyToggledBanner: true,

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

	// passed in from app.js through embed props modifier
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
