import { ADD_CATEGORY,
    ADD_SUB_CATEGORY,
    DELETE_CATEGORY
} from '../actions';
import Immutable from 'immutable';


const initialState = Immutable.Map({
    nestedCategories: Immutable.Map(),
});


function categoryListReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CATEGORY: {
            let nestedCategories = state.get('nestedCategories');
            nestedCategories = nestedCategories.set(action.payload, action.payload);
            state = state.set('nestedCategories', nestedCategories);
            return state;
        }

        case ADD_SUB_CATEGORY:
            return state;

        case DELETE_CATEGORY:
            return state;

      default: return state;
    }
}

export default categoryListReducer;
