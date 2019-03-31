import { combineEpics } from 'redux-observable'
import { createSignalrEpic } from './signalrEpic';

export const rootEpic = combineEpics(
    createSignalrEpic(),
);