import { registry } from './registry';
import { Component } from './component';

let props = {
	value: 'hi im a textarea',
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

	return `
  <textarea
    type="textarea"
    id="textarea"
    onchange="${updateValue}"
  >${value}</textarea>
  `;
};

const Textarea = new Component(props, lazyGetOwnHTML);

export default Textarea;
