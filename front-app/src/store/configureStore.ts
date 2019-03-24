import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, initialRootState } from './rootState';
import { RootActions } from './rootActions';
import { rootReducer } from '../reducers/rootReducer';

export const configureStore = (preloadedState: RootState = initialRootState) => {
    const enhancer = composeWithDevTools(applyMiddleware(thunk));

    const store = createStore<RootState, RootActions, {}, {}>(
        rootReducer,
        preloadedState,
        enhancer
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/rootReducer', () => {
            store.replaceReducer(rootReducer)
        });
    }

    return store;
}
