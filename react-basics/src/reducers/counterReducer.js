import { ADD_CATEGORY,
    ADD_SUB_CATEGORY,
    DELETE_CATEGORY,
    ADD_TODO,
    PICK_CATEGORY,
    TOGGLE_TODO,
    RESTART
 } from '../actions';
import Immutable from 'immutable';


const stateArchitechture = Immutable.Map({
    category: Immutable.Map({
        todo: Immutable.Map({
            isDone: false,
            desctiption: ''
        })
    })
});


function todoListReducer(state = Immutable.Map(), action) {
    switch (action.type) {
        case ADD_CATEGORY: {
            return state.set(action.payload, Immutable.Map());
        }

        case PICK_CATEGORY: {
            return state.set('selectedCategory', action.payload);
        }

        case ADD_TODO: {
            const selectedCategoryName = state.get('selectedCategory');
            let categoryCell = state.get(selectedCategoryName);
            categoryCell = categoryCell.set(action.payload, Immutable.Map({
                isDone: false,
                description: ''
            }));
            return state.set(selectedCategoryName, categoryCell)
        }

        case TOGGLE_TODO: {
            const selectedCategoryName = state.get('selectedCategory');
            let categoryCell = state.get(selectedCategoryName);
            let todoCell = categoryCell.get(action.payload);

            const todoValue = todoCell.get('isDone');
            if (todoValue) {
                todoCell = todoCell.set('isDone', false);
            } else {
                todoCell = todoCell.set('isDone', true);
            }

            categoryCell = categoryCell.set(action.payload, todoCell);
            return state.set(selectedCategoryName, categoryCell);
        }

        case ADD_SUB_CATEGORY: {

            return state;
        }

        case DELETE_CATEGORY: {
            let selectedCategoryName = state.get('selectedCategory');
            state = action.payload === selectedCategoryName ? state.set('selectedCategory', '') : state;
            return state.delete(action.payload);
        }

        case RESTART: {
            return state.set('selectedCategory', '');
        }

      default: return state;
    }
}

export default todoListReducer;
