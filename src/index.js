import 'regenerator-runtime/runtime';
import './window';
import App from './app';

App.buildComponentTree();
document.querySelector('#root').appendChild(App.ownTree);
