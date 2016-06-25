

import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);


export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
};