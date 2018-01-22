import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';

import store from './store';
import { Provider } from 'react-redux';


import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
installDevTools(Immutable);
window.Immutable = Immutable;


ReactDOM.render((
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
