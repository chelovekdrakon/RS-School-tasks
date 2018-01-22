import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { logger } from './middleware';

import categoryListReducer from './reducers/categoryListReducer';
import todoListReducer from './reducers/todoListReducer';

const appReducers = combineReducers({
    categoryList: categoryListReducer,
    todos: todoListReducer
});

const store = createStore(
    appReducers,
    applyMiddleware(logger)
);

export default store;
