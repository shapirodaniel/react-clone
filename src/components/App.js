import { propsRegistry } from '../core/window';
import { Component } from '../core/component';
import { Nav, RandomWords, Textarea } from './';

let props = {
	isBannerVisible: true,

	hideBanner(componentKey) {
		propsRegistry[componentKey] = {
			...propsRegistry[componentKey],
			isBannerVisible: false,
		};

		App.update(propsRegistry[componentKey]);
	},
};

const lazyGetOwnHTML = () => `

		${Nav.embed()}

		${RandomWords.embed(
			propsRegistry[RandomWords.key] && {
				...propsRegistry[RandomWords.key],
				hideBanner: App.props.hideBanner,
			}
		)}

		${Textarea.embed()}
`;

const App = new Component(props, lazyGetOwnHTML);

export default App;
