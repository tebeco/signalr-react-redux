import { combineReducers } from 'redux';
import { streamingReducer } from './streamingReducer';
import { workspaceReducer } from './workspaceReducer';

export const rootReducer = combineReducers({
    streaming: streamingReducer,
    workspace: workspaceReducer
});
