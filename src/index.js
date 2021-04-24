import 'regenerator-runtime/runtime';
import './core/window';
import { App } from './components';

App.buildComponentTree();
document.querySelector('#root').appendChild(App.ownTree);
