import { ADD_CATEGORY,
    ADD_SUB_CATEGORY,
    DELETE_CATEGORY,
    ADD_TODO,
    PICK_CATEGORY } from '../actions';
import Immutable from 'immutable';


const initialState = Immutable.Map({
    todos: Immutable.Map(),
    toRender: Immutable.List(),
    selectedCategory: ''
});


function categoryListReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CATEGORY: {
            let todos = state.get('todos');
            todos = todos.set(action.payload, Immutable.List());
            state = state.set('todos', todos);
            return state;
        }

        case PICK_CATEGORY: {
            let todos = state.get('todos');
            let toRender = todos.get(action.payload);
            state = state.set('toRender', toRender);
            return state.set('selectedCategory', action.payload);
        }

        case ADD_TODO: {
            let selectedCategoryValue = state.get('selectedCategory');
            let todos = state.get('todos');
            let cell = todos.get(selectedCategoryValue);
            cell = cell.push(action.payload);
            todos = todos.set(selectedCategoryValue, cell);
            return state.set('todos', todos);
        }

        case ADD_SUB_CATEGORY:
            return state;

        case DELETE_CATEGORY:
            return state;

      default: return state;
    }
}

export default categoryListReducer;
