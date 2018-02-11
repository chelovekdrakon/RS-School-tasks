export const logger = ({ getState }) => next => action => {
    console.log('will dispatch', action);
    const state = next(action);

    console.log('state after dispatch', getState());
    return state;
}
