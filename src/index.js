import App from './customComponentTemplate';
import { DOMManager } from './renderDOM';

let componentList = [App];

const DOM = new DOMManager(componentList);

const refreshDOM = () => {
	DOM.setComponents(componentList);
};

setInterval(refreshDOM, 50);
