import { registry } from './registry';
import { Component } from './component';
import RandomWords from './randomWords';
import App from './app';

let props = {
	value: '...or enter your own fact here!',
	updateValue(componentKey) {
		registry[componentKey] = {
			...registry[componentKey],
			value: document.getElementById('textarea').value,
		};

		Textarea.update(registry[componentKey]);
	},
};

const lazyGetOwnHTML = () => {
	const value = Textarea.useProp('value');
	const updateValue = Textarea.usePropUpdater('updateValue');

	// usePropUpdater takes optional key and data args
	// in addition to first arg "funcNameAsString"
	// important! by passing in a different key, usePropUpdater
	// will copy a foreign prop to the componentInstance

	// right now the only kind of data that can be passed in may be string
	// so it might require some additional JSON.parse logic on
	// arrays, objects etc.

	const updateText = RandomWords.usePropUpdater(
		'updateText',
		RandomWords.key,
		value
	);

	const hideBanner = Textarea.usePropUpdater('hideBanner', App.key);

	// important!
	// block backticks are sensitive to whitespace
	// so interpolated values like ${value} in <textarea/>
	// must not have any whitespace including line-breaks

	return `
  <div style='
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	'>
		<textarea
			type="textarea"
			id="textarea"
			onchange="${updateValue}"
			style='height: 140px; font-size: 1em; font-family: sans-serif; text-align: left;'
		>${value}</textarea>

		<button onclick="{${updateText}; ${hideBanner};}">
			click me to print your fact above!
		</button>
	</div>
  `;
};

const Textarea = new Component(props, lazyGetOwnHTML);

export default Textarea;
