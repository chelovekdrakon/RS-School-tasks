import { ADD_CATEGORY,
    ADD_SUB_CATEGORY,
    DELETE_CATEGORY,
    ADD_TODO,
    PICK_CATEGORY,
    TOGGLE_TODO,
    RESTART
 } from '../actions';
import Immutable from 'immutable';

// Example of data structure
//
// const stateArchitechture = Immutable.Map({
//     todos: Immutable.Map({
//         category: Immutable.Map({
//             todo: Immutable.Map({
//                 isDone: false,
//                 desctiption: ''
//             })
//         })
//     }),
//     selectedCategory: ''
// });


const initialState = Immutable.Map({
    todos: Immutable.Map(),
    selectedCategory: '',
    selectedListMap: Immutable.Map()
})


function todoListReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CATEGORY: {
            const categoryName = action.payload;
            return state.setIn(['todos', `${categoryName}`], Immutable.Map());
        }

        case PICK_CATEGORY: {
            const categoryName = action.payload;
            const listMap = state.getIn(['todos', `${categoryName}`]);
            state = state.set('selectedListMap', listMap);
            return state.set('selectedCategory', categoryName);
        }

        case ADD_TODO: {
            const categoryName = state.get('selectedCategory');
            const todoName = action.payload;
            const initialValue = Immutable.Map({
                isDone: false,
                description: ''
            });
            state = state.setIn(['todos', `${categoryName}`, `${todoName}`], initialValue);
            return state.setIn(['selectedListMap', `${todoName}`], initialValue);
        }

        case TOGGLE_TODO: {
            const categoryName = state.get('selectedCategory');
            let todoName = action.payload;
            const todoValue = state.getIn(['todos', `${categoryName}`, `${todoName}`, 'isDone']);

            if (todoValue) {
                state = state.setIn(['selectedListMap', `${todoName}`, 'isDone'], false);
                return state.setIn(['todos', `${categoryName}`, `${todoName}`, 'isDone'], false)
            } else {
                state = state.setIn(['selectedListMap', `${todoName}`, 'isDone'], true);
                return state.setIn(['todos', `${categoryName}`, `${todoName}`, 'isDone'], true)
            }
        }

        case ADD_SUB_CATEGORY: {
            const categoryName = action.payload;
            return state.setIn(['todos', `${categoryName}`], Immutable.Map());
        }

        case DELETE_CATEGORY: {
            const selectedCategoryName = state.get('selectedCategory');
            const categoryName = action.payload;

            if (categoryName === selectedCategoryName) {
                state = state.set('selectedCategory', '');
                state = state.set('selectedListMap', Immutable.Map());
            }

            return state.deleteIn(['todos', `${categoryName}`]);
        }

        case RESTART: {
            return state.set('selectedCategory', '');
        }

      default: return state;
    }
}

export default todoListReducer;
