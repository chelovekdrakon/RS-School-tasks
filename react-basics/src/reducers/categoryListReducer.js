import { ADD_CATEGORY,
    ADD_SUB_CATEGORY,
    DELETE_CATEGORY
} from '../actions';
import Immutable from 'immutable';


const initialState = Immutable.Map({
    nestedCategories: Immutable.Map(),
    paths: Immutable.Map()
});


function categoryListReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CATEGORY: {
            let nestedCategories = state.get('nestedCategories');
            nestedCategories = nestedCategories.set(action.payload, action.payload);
            state = state.set('nestedCategories', nestedCategories);

            let paths = state.get('paths');
            paths = paths.set(action.payload, Immutable.fromJS([action.payload]))
            return state.set('paths', paths);
        }

        case ADD_SUB_CATEGORY: {
            let paths = state.get('paths');
            let pathToParent = paths.get(action.payload);
            let pathToChild = pathToParent.push(action.payload);
            paths = paths.set(action.payload.value, pathToChild);
            state = state.set('paths', paths);
            console.log(pathToParent, 'path to parent');
            console.log(pathToChild, 'path to child');

            let nestedCategories = state.get('nestedCategories');
            let parentValue = nestedCategories.getIn(pathToParent);
            console.log(parentValue, 'parentValue');
            // Immutable.isMap(parentValue) ? parentValue
            // nestedCategories = nestedCategories.setIn(pathToChild, action.payload.value);
            return state.set('nestedCategories', nestedCategories);
        }

        case DELETE_CATEGORY: {
            let paths = state.get('paths');
            let pathToNode = paths.get(action.payload);
            paths = paths.delete(action.payload);
            state = state.set('paths', paths);

            let nestedCategories = state.get('nestedCategories');
            nestedCategories = nestedCategories.deleteIn(pathToNode)
            return state.set('nestedCategories', nestedCategories);
        }

      default: return state;
    }
}

export default categoryListReducer;
