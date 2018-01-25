import { ADD_CATEGORY,
    ADD_SUB_CATEGORY,
    DELETE_CATEGORY,
    ADD_TODO,
    PICK_CATEGORY,
    TOGGLE_TODO,
    RESTART
 } from '../actions';
import Immutable from 'immutable';


const initialState = Immutable.Map({
    todos: Immutable.Map(),
    toRender: Immutable.List(),
    done: Immutable.Map(),
    selectedCategory: ''
});


function categoryListReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CATEGORY: {
            let existTODO = state.get('done');
            if (existTODO.get(action.payload)) {
                return console.log('')
            }
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
            state = state.set('todos', todos);

            state = state.set('toRender', cell);

            let done = state.get('done');
            done = done.set(action.payload, false);
            return state.set('done', done);
        }

        case TOGGLE_TODO: {
            let done = state.get('done');
            let value = done.get(action.payload);
            if (value) {
                done = done.set(action.payload, false);
            } else {
                done = done.set(action.payload, true);
            }
            return state.set('done', done);
        }

        case ADD_SUB_CATEGORY: {

            return state;
        }

        case DELETE_CATEGORY: {
            let todos = state.get('todos');
            todos = todos.delete(action.payload);
            state = state.set('todos', todos);

            let selectedCategoryValue = state.get('selectedCategory');
            if (action.payload === selectedCategoryValue) {
                state = state.set('selectedCategory', '');
                return state.set('toRender', Immutable.List())
            } else {
                return state;
            }
        }

        case RESTART: {
            return state.set('selectedCategory', '');
        }

      default: return state;
    }
}

export default categoryListReducer;
