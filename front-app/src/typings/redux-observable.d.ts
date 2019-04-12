import 'redux-observable';

declare module 'redux-observable' {
    interface ActionsObservable<T extends { type: string }> {
        ofType<AT extends T>(
            ...keys: Array<AT['type']>
        ): ActionsObservable<AT>;
    }
}