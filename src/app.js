import { Component } from './component';
import RandomWords from './randomWords';
import Textarea from './textarea';

let props = {};

const lazyGetOwnHTML = () => `
	<section id='topLevelContainer'>
		${RandomWords.embed()}
		${Textarea.embed()}
	</section>
`;

const App = new Component(props, lazyGetOwnHTML);

export default App;
