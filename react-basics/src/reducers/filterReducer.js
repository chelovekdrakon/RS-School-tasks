import {  TOGGLE_FILTER } from '../actions';

const initialState = false;


function categoryListReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FILTER: {
            if (state) {
                return false
            } else {
                return true;
            }
        }

      default: return state;
    }
}

export default categoryListReducer;
