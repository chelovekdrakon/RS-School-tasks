import { ADD_CATEGORY,
    ADD_SUB_CATEGORY,
    DELETE_CATEGORY,
    ADD_TODO,
    PICK_CATEGORY,
    TOGGLE_TODO,
    RESTART,
    ADJUST_DELIVERY,
    CHANGE_TODO_DESCRIPTION,
    CONFIRM_SUB_CATEGORY
 } from '../actions';
import Immutable from 'immutable';

// Example of todos data structure
//
//     todos: Immutable.Map({
//         category: Immutable.Map({
//             todo: Immutable.Map({
//                 isDone: false,
//                 desctiption: ''
//             })
//         })
//     }),
// });


const initialState = Immutable.Map({
    todos: Immutable.Map(),
    selectedCategory: '',
    pathToSelectedNode: Immutable.List(),
    selectedListMap: Immutable.Map(),
    adjustedBySearch: Immutable.Map(),
})


function todoListReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CATEGORY: {
            const categoryName = action.payload;
            return state.setIn(['todos', `${categoryName}`], Immutable.Map());
        }

        case CONFIRM_SUB_CATEGORY: {
            const { input } = action.payload;
            return state.setIn(['todos', input], Immutable.Map());
        }

        case PICK_CATEGORY: {
            const { value, pathToNode } = action.payload;
            const listMap = state.getIn(['todos', `${value}`]);
            state = state.set('selectedListMap', listMap);
            state = state.set('pathToSelectedNode', pathToNode);
            return state.set('selectedCategory', value);
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

        case ADJUST_DELIVERY: {
            const selectedListMap = state.get('selectedListMap');
            state = state.set('adjustedBySearch', selectedListMap);

            const arrTodos = Array.from(selectedListMap.keys());
            if (arrTodos.length === 0) return state;

            const searchingValue = action.payload;
            const notRelevantTodos = [];
            arrTodos.forEach(todo => {
                const todoLettersArray = todo.split('');
                const searchingLettersArray = searchingValue.split('');

                for (let i in searchingLettersArray) {
                    if (todoLettersArray[i] !== searchingLettersArray[i]) {
                        notRelevantTodos.push(todo);
                    }
                }
            });
            notRelevantTodos.forEach(todo => {
                state = state.deleteIn(['adjustedBySearch', todo]);
            })
            return state;
        }

        case CHANGE_TODO_DESCRIPTION: {
            const {isDone, newTodoName, todoName, category, description} = action.payload;
            const newMap = Immutable.Map({
                isDone: isDone,
                description: description
            });
            if (newTodoName !== todoName) {
                state = state.deleteIn(['todos', `${category}`, `${todoName}`]);
                state = state.deleteIn(['selectedListMap', `${todoName}`]);
            }
            state = state.setIn(['todos', `${category}`, `${newTodoName}`], newMap);
            return state.setIn(['selectedListMap', `${newTodoName}`], newMap)
        }

      default: return state;
    }
}

export default todoListReducer;
