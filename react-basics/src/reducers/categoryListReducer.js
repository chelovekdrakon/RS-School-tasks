import { ADD_CATEGORY,
    ADD_SUB_CATEGORY,
    DELETE_CATEGORY,
    EDIT_CATEGORY,
    SUBMIT_EDITION
} from '../actions';
import Immutable from 'immutable';
import { INPUT_FIELD } from '../constants';

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

        case EDIT_CATEGORY: {
            const pathToNode = action.payload;
            const categoryName = Array.from(pathToNode).pop();
            const pathToParent = pathToNode.slice(0, -1);
            return state.updateIn(pathToParent, el => {
                return el.mapKeys(elementMap => {
                    console.log(elementMap);
                    return elementMap === categoryName ? INPUT_FIELD : elementMap
                });
            });
        }

        case SUBMIT_EDITION: {
            const { pathToParent, input } = action.payload;
            return state.updateIn(pathToParent, el => {
                return el.mapKeys(elementMap => {
                    return elementMap === INPUT_FIELD ? input : elementMap;
                })
            })
        }

        case DELETE_CATEGORY: {
            const pathToNode = action.payload;
            return state.deleteIn([...pathToNode]);
        }

      default: return state;
    }
}

export default categoryListReducer;
