import { VisibilityFilters } from '../actions';

const initialState = false;


function categoryListReducer(state = initialState, action) {
    switch (action.type) {
        case VisibilityFilters.SHOW_ALL: {
            return true;
        }

        case VisibilityFilters.SHOW_DONE: {
            return false;
        }

      default: return state;
    }
}

export default categoryListReducer;
