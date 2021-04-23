import { registry } from './registry';
import { Component } from './component';
import NavLink from './navLink';

let props = {
	navLinks: [
		{
			icon: 'home',
			text: 'home',
		},
		{
			icon: 'groups',
			text: 'about',
		},
		{
			icon: 'question_answer',
			text: 'contact',
		},
	],
};

const lazyGetOwnHTML = () => {
	return `
  <header style='display: flex; flex-direction: column;'>
    <h1>Welcome!</h1>
    <div
      style='
        color: gold;
        font-size: 1em;
        display: flex;
        align-items: center;
        justify-content: space-between;
      '
    >
      ${WelcomeBanner.props.navLinks.map(link => NavLink.embed(link)).join('')}
    </div>
  </header>
  `;
};

const WelcomeBanner = new Component(props, lazyGetOwnHTML);

export default WelcomeBanner;
