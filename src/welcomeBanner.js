import { registry } from './registry';
import { Component } from './component';

let props = {
	navLinks: [
		{
			text: 'home',
			icon: 'home',
		},
		{
			text: 'about',
			icon: 'groups',
		},
		{
			text: 'contact',
			icon: 'question_answer',
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
        width: 50%;
      '
    >
      ${WelcomeBanner.props.navLinks
				.map(
					link => `
        <div
          style='
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
          '
        >
          <i class='material-icons'>${link.icon}</i>
          <span>${link.text}</span>
        </div>
        `
				)
				.join('')}
    </div>
  </header>
  `;
};

const WelcomeBanner = new Component(props, lazyGetOwnHTML);

export default WelcomeBanner;
