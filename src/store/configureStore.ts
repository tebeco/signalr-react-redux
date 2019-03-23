import { createStore, applyMiddleware, combineReducers, AnyAction, ReducersMapObject } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, initialRootState } from './rootState';
import { streamingReducer } from '../reducers/streamingReducer';

const rootReducer = combineReducers<RootState>({ streaming: streamingReducer });

export const configureStore = (preloadedState: RootState = initialRootState) => {
    const enhancer = composeWithDevTools(applyMiddleware(thunk));

    const store = createStore<RootState, AnyAction, {}, {}>(
        rootReducer,
        preloadedState,
        enhancer
    );

    return store;
}
