import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
import todoApp from './reducers';


let store = createStore(todoApp);

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
