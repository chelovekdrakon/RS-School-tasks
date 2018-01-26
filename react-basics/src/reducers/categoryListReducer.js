import { ADD_CATEGORY,
    ADD_SUB_CATEGORY,
    DELETE_CATEGORY,
    CONFIRM_SUB_CATEGORY
} from '../actions';
import Immutable from 'immutable';
import {
    INPUT_FIELD
} from '../constants';

const initialState = Immutable.Map({
    nestedCategories: Immutable.Map(),
    paths: Immutable.Map()
});


function categoryListReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CATEGORY: {
            const newCategoryName = action.payload
            state = state.setIn(['nestedCategories', newCategoryName], Immutable.Map())

            let paths = state.get('paths');
            paths = paths.set(action.payload, Immutable.fromJS([action.payload]))
            return state.set('paths', paths);
        }

        case ADD_SUB_CATEGORY: {
            const pathToNode = action.payload;
            return state.setIn(['nestedCategories', ...pathToNode, INPUT_FIELD], Immutable.Map());
        }

        case CONFIRM_SUB_CATEGORY: {
            const { pathToParent, input } = action.payload;
            state = state.deleteIn(['nestedCategories', ...pathToParent, INPUT_FIELD]);
            return state.setIn(['nestedCategories', ...pathToParent, input], Immutable.Map());
        }

        case DELETE_CATEGORY: {
            const pathToNode = action.payload;
            return state.deleteIn(['nestedCategories', ...pathToNode]);
        }

      default: return state;
    }
}

export default categoryListReducer;
