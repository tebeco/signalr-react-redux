import { combineReducers } from 'redux';
import { connectivityReducer } from './connectivityReducer';
import { workspaceReducer } from './productReducer';
import { streamingReducer } from './streamingReducer';

export const rootReducer = combineReducers({
    connectivity: connectivityReducer,
    workspace: workspaceReducer,
    streaming: streamingReducer,
});
