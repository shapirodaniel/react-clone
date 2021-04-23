import { Component } from './component';

let props = {};

const lazyGetOwnHTML = () => {
	return `
  <header>
    <h1>Welcome!</h1>
  </header>
  `;
};

const WelcomeBanner = new Component(props, lazyGetOwnHTML);

export default WelcomeBanner;
