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
  <nav>
    <h3 id='logo'>RF</h3>
    <div
      style='
        font-size: .8em;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 400px;
      '
    >
      ${Nav.props.navLinks.map(link => NavLink.embed(link)).join('')}
    </div>
  </nav>
  `;
};

const Nav = new Component(props, lazyGetOwnHTML);

export default Nav;
