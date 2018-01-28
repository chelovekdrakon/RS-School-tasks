import { ADD_CATEGORY,
    DELETE_CATEGORY,
    ADD_TODO,
    PICK_CATEGORY,
    TOGGLE_TODO,
    RESTART,
    ADJUST_DELIVERY,
    CHANGE_TODO_DESCRIPTION,
    SUBMIT_EDITION,
    TRANSIT_TODO,
    EDIT_CATEGORY
 } from '../actions';
 import { INPUT_FIELD } from '../constants';
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

        case EDIT_CATEGORY: {
            const pathToNode = action.payload;
            const categoryName = pathToNode.join('');
            return state.update('todos', mapOfCategories => {
                return mapOfCategories.mapKeys(category => {
                    return category === categoryName ? INPUT_FIELD : category;
                })
            })
        }

        case SUBMIT_EDITION: {
            const { input, pathToParent } = action.payload;
            const newCategoryName = [...pathToParent, input].join('');
            const isItEdition = state.getIn(['todos', INPUT_FIELD]);

            if (isItEdition) {
                return state.update('todos', mapOfCategories => {
                    return mapOfCategories.mapKeys(category => {
                        return category === INPUT_FIELD ? newCategoryName : category;
                    })
                })
            } else {
                return state.setIn(['todos', newCategoryName], Immutable.Map());
            }

        }

        case PICK_CATEGORY: {
            const { value, pathToNode } = action.payload;
            const categoryName = pathToNode.join('');
            const todosUnderCategory = state.getIn(['todos', categoryName]);
            state = state.set('selectedListMap', todosUnderCategory);
            state = state.set('pathToSelectedNode', Array.from(pathToNode));
            return state.set('selectedCategory', value);
        }

        case ADD_TODO: {
            const pathToNode = state.get('pathToSelectedNode');
            const todoName = action.payload;
            const initialTodo = Immutable.Map({
                isDone: false,
                description: ''
            });
            state = state.setIn(['todos', [...pathToNode].join(''), `${todoName}`], initialTodo);
            return state.setIn(['selectedListMap', `${todoName}`], initialTodo);
        }

        case TOGGLE_TODO: {
            const pathToNode = state.get('pathToSelectedNode');
            const todoName = action.payload;
            const todoValue = state.getIn(['todos', [...pathToNode].join(''), `${todoName}`, 'isDone']);

            if (todoValue) {
                state = state.setIn(['selectedListMap', `${todoName}`, 'isDone'], false);
                return state.setIn(['todos', [...pathToNode].join(''), `${todoName}`, 'isDone'], false);
            } else {
                state = state.setIn(['selectedListMap', `${todoName}`, 'isDone'], true);
                return state.setIn(['todos', [...pathToNode].join(''), `${todoName}`, 'isDone'], true)
            }
        }

        case DELETE_CATEGORY: {
            const pathToSelectedNode = state.get('pathToSelectedNode');
            const pathToChosenNode = action.payload;

            let identical = true;

            pathToSelectedNode.forEach( (value, index) => {
                if (value !== pathToChosenNode[index]) {
                    identical = false;
                }
            });

            if (identical) {
                state = state.set('selectedCategory', '');
                state = state.set('selectedListMap', Immutable.Map());
                state = state.set('pathToSelectedNode', Immutable.Set());
            }

            return state.deleteIn(['todos', [...pathToChosenNode].join('')]);
        }

        case RESTART: {
            state = state.set('pathToSelectedNode', Immutable.Set());
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

        case TRANSIT_TODO: {
            const { newCategoryPath, todoName } = action.payload;
            const oldCategoryPath = state.get('pathToSelectedNode');
            const todoDescription = state.getIn(['todos', [...oldCategoryPath].join(''), `${todoName}`]);

            state = state.deleteIn(['todos', [...oldCategoryPath].join(''), `${todoName}`]);
            state = state.setIn(['todos', [...newCategoryPath].join(''), `${todoName}`], todoDescription);
            state = state.set('pathToSelectedNode', Array.from(newCategoryPath));
            state = state.set('selectedCategory', Array.from(newCategoryPath).pop());
            return state.set('selectedListMap', state.getIn(['todos', [...newCategoryPath].join('')]));
        }

      default: return state;
    }
}

export default todoListReducer;
