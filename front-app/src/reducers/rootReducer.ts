import { combineReducers } from 'redux';
import { streamingReducer } from './streamingReducer';

export const rootReducer = combineReducers({ streaming: streamingReducer });
