import { createStore, applyMiddleware } from 'redux';
import data from './data.json';
import appReducers from './reducers';


const logger = ({ getState }) => next => action => {
    console.log('will dispatch', action);
    const state = next(action);

    console.log('state after dispatch', getState());
    return state;
}


function dataLoadingMiddleware({ getState, dispatch }) {
  return next => action => {
    if (action.type === 'LOAD_DATA') {
        loadData().then(data => {
            dispatch({ type: 'RECEIVE_DATA', payload: data })
        })
    }

    return next(action);
  }
}

function loadData() {
    return new Promise((res, rej) => {
        setTimeout(() => res(data), 2000)
    })
}

const store = createStore(
    appReducers,
    applyMiddleware(
        logger,
        dataLoadingMiddleware
    )
);
window.store = store;


Object.defineProperty(window, 'state', {
    get() {
        return store.getState();
    }
});


export default store;
