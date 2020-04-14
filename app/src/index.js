import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/Routes';
import {HashRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'prismjs/themes/prism-coy.css';
import UserProvider from './context/User'
ReactDOM.render(
	<HashRouter>
		<UserProvider><Routes></Routes></UserProvider>
	</HashRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
