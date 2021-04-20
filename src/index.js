import App from './customComponentTemplate';
import { DOMManager } from './renderDOM';

let componentList = [App];

const manager = new DOMManager(componentList);

const refreshDOM = () => {
	manager.setComponents(componentList);

	let newAppTree = new DocumentFragment();
	newAppTree.appendChild(App);

	document.querySelector('#root').appendChild(newAppTree);
};

setInterval(refreshDOM, 50);
