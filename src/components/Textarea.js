import { propsRegistry } from '../core/window';
import { Component } from '../core/component';
import { RandomWords } from './';

let props = {
	value: '...or enter your own fact here!',

	updateValue(componentKey) {
		propsRegistry[componentKey] = {
			...propsRegistry[componentKey],
			value: document.getElementById('textarea').value,
		};

		Textarea.update(propsRegistry[componentKey]);
	},
};

const markup = () => {
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
		propsRegistry[Textarea.key].value
	);

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
			onblur="${updateValue}"
			onmouseout="document.getElementById('textarea').blur()"
			style='height: 140px; font-size: 1em; font-family: sans-serif; text-align: left;'
		>${value}</textarea>

		<button onclick="${updateText}">
			click me to print your fact above!
		</button>

	</div>
  `;
};

const Textarea = new Component(props, markup);

export default Textarea;
