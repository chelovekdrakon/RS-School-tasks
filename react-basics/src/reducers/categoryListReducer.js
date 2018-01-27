import { ADD_CATEGORY,
    ADD_SUB_CATEGORY,
    DELETE_CATEGORY,
    CONFIRM_SUB_CATEGORY
} from '../actions';
import Immutable from 'immutable';
import {
    INPUT_FIELD
} from '../constants';

function categoryListReducer(state = Immutable.Map(), action) {
    switch (action.type) {
        case ADD_CATEGORY: {
            const newCategoryName = action.payload;
            return state.setIn([newCategoryName], Immutable.Map());
        }

        case ADD_SUB_CATEGORY: {
            const pathToNode = action.payload;
            return state.setIn([...pathToNode, INPUT_FIELD], Immutable.Map());
        }

        case CONFIRM_SUB_CATEGORY: {
            const { pathToParent, input } = action.payload;
            state = state.deleteIn([...pathToParent, INPUT_FIELD]);
            return state.setIn([...pathToParent, input], Immutable.Map());
        }

        case DELETE_CATEGORY: {
            const pathToNode = action.payload;
            return state.deleteIn([...pathToNode]);
        }

      default: return state;
    }
}

export default categoryListReducer;
