function currentUserReducer(state = -1, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER_ID':
            return action.payload;
        default: return state;
    }
}

export default currentUserReducer;
