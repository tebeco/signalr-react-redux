import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, initialRootState } from './rootState';
import { streamingReducer } from '../reducers/streamingReducer';
import { RootActions } from './rootActions';

const rootReducer = combineReducers({ streaming: streamingReducer });

export const configureStore = (preloadedState: RootState = initialRootState) => {
    const enhancer = composeWithDevTools(applyMiddleware(thunk));

    const store = createStore<RootState, RootActions, {}, {}>(
        rootReducer,
        preloadedState,
        enhancer
    );

    return store;
}
