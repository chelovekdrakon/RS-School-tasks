const initialState = {
    usersList: [],
    usersMap: new Map()
}

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'RECEIVE_DATA':
            return {
                usersList: action.payload,
                usersMap: action.payload.reduce( (map, user) => {
                    map.set(user._id, user);
                    return map;
                }, new Map())
            };
        default: return state;
    }
}

export default usersReducer;
