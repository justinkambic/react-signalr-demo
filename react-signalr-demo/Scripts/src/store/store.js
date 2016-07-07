

import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

/**
 * Configure the Redux store to use Thunk middleware.
 * @param { Object } initialState The starting state of the app.
 * @returns { Object } The Redux store.
 */
export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}
