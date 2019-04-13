import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, initialRootState } from './rootState';
import { RootAction } from './rootActions';
import { rootReducer } from '../reducers/rootReducer';
import { rootEpic } from '../epics/rootEpic';

export const configureStore = (preloadedState: RootState = initialRootState) => {
    const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, {}>();

    const enhancer = composeWithDevTools(applyMiddleware(thunk, epicMiddleware));

    const store = createStore<RootState, RootAction, {}, {}>(
        rootReducer,
        preloadedState,
        enhancer
    );

    epicMiddleware.run(rootEpic);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/rootReducer', () => {
            store.replaceReducer(rootReducer)
        });
    }

    return store;
}
