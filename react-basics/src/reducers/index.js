import { combineReducers } from 'redux';
import usersReducer from './users-reducer';
import currentUserReducer from './current-user-reducer';

const appReducers = combineReducers({
    users: usersReducer,
    currentUserID: currentUserReducer
});

export default appReducers;
