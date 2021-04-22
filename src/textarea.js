import { registry } from './registry';
import { Component } from './component';
import { v4 as uuidv4 } from 'uuid';

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

const textareaKey = uuidv4();

const Textarea = new Component(textareaKey, props, lazyGetOwnHTML);

export default Textarea;
