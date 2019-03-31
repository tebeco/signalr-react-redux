import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RootState } from '../store/rootState';
import { RootActions } from '../store/rootActions';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import { ofType } from 'redux-observable';
import { ConnectAction } from '../reducers/streamingActions';


export const createSignalrEpic = () => (actions$: Observable<RootActions>, state$: Observable<RootState>) => {
    //Create subject
    const signalrEpicSubject = new Subject<RootActions>();

    //connect ws 
    const hubConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl("https://localhost:5001/clients")
        .build();

    actions$.pipe(
        ofType('STREAMING_CONNECT_ACTION'),
        tap<ConnectAction>(() => {
            hubConnection.start()
                .then(() => {
                    signalrEpicSubject.next({
                        type: 'STREAMING_CONNECTED_ACTION'
                    });
                })
                .catch((err) => {
                    console.log(err)
                    signalrEpicSubject.next({
                        type: 'STREAMING_DISCONNECTED_ACTION'
                    });
                });
        })
    );

    return signalrEpicSubject.asObservable();
};





////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          SUBSCRIBE TO STREAM                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const streamResult = hubConnection.stream("randomIntStream");
// const subscription = streamResult.subscribe({
//     next: (msg) => {
//         console.table(msg);
//     },
//     error: (err) => {
//         console.log(err);
//     },
//     complete: () => {
//         console.log('stream as completed');
//     },
// });


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          UNSUBSCRIBE TO STREAM                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// subscription.dispose();