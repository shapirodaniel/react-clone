import { registry } from './registry';
import { Component } from './component';

// if a prop is inherited from a parent
// it doesn't exist on props yet
// we are initializing an empty props object here
// but the Component class also defaults props to {}

let props = {};

const lazyGetOwnHTML = () => {
	const icon = NavLink.useProp('icon');
	const text = NavLink.useProp('text');

	return `
        <div
          style='
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
          '
        >
          <i class='material-icons'>${icon}</i>
          <span>${text}</span>
        </div>
        `;
};

const NavLink = new Component(props, lazyGetOwnHTML);

export default NavLink;
