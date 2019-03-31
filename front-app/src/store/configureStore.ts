import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, initialRootState } from './rootState';
import { RootActions } from './rootActions';
import { rootReducer } from '../reducers/rootReducer';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../epics/rootEpic';

export const configureStore = (preloadedState: RootState = initialRootState) => {
    const epicMiddleware = createEpicMiddleware<RootActions, RootActions, RootState, {}>();

    const enhancer = composeWithDevTools(applyMiddleware(thunk, epicMiddleware));

    const store = createStore<RootState, RootActions, {}, {}>(
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
