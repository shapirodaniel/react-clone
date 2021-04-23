import { registry } from './registry';
import { Component } from './component';
import RandomWords from './randomWords';

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

	const updateText = RandomWords.usePropUpdater(
		'updateText',
		RandomWords.key,
		value
	);

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

		<button onclick="${updateText}">
			click me to print your fact above!
		</button>
	</div>
  `;
};

const Textarea = new Component(props, lazyGetOwnHTML);

export default Textarea;
