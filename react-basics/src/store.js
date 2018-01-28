import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { logger } from './middleware';
import undoable, { distinctState } from 'redux-undo'
import categoryListReducer from './reducers/categoryListReducer';
import todoListReducer from './reducers/todoListReducer';
import filterReducer from './reducers/filterReducer';

const appReducers = combineReducers({
    categoryList: categoryListReducer,
    todos: todoListReducer,
    displayFilter: filterReducer
});

const undoableReducers = undoable(appReducers, {
    filter: distinctState()
});

const store = createStore(
    undoableReducers,
    applyMiddleware(logger)
);

export default store;
