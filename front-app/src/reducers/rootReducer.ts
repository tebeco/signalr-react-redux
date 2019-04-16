import { combineReducers } from 'redux';
import { streamingReducer } from './connectivityReducer';
import { workspaceReducer } from './workspaceReducer';

export const rootReducer = combineReducers({
    streaming: streamingReducer,
    workspace: workspaceReducer
});
