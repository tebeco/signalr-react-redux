import { combineEpics } from 'redux-observable'
import { createSignalrEpic } from './signalrEpic';
import { subscribeToAllInfiniteProductEpic } from './subscribeToAllInfiniteProductEpic';

export const rootEpic = combineEpics(
    createSignalrEpic(),
    subscribeToAllInfiniteProductEpic(),
);
