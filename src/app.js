import { registry } from './registry';
import { Component } from './component';
import RandomWords from './randomWords';
import Textarea from './textarea';
import WelcomeBanner from './welcomeBanner';

let props = {
	isBannerVisible: true,
	hideBanner(componentKey) {
		registry[componentKey] = {
			...registry[componentKey],
			isBannerVisible: false,
		};

		App.update(registry[componentKey]);
	},
};

const lazyGetOwnHTML = () => `
	<section id='topLevelContainer'>
		${(App.props.isBannerVisible && WelcomeBanner.embed()) || `<div/>`}

		${RandomWords.embed(
			registry[RandomWords.key] && {
				...registry[RandomWords.key],
				hideBanner: App.props.hideBanner,
			}
		)}

		${Textarea.embed()}
	</section>
`;

const App = new Component(props, lazyGetOwnHTML);

export default App;
