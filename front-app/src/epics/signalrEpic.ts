import { Observable, defer, Subject } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { RootState } from '../store/rootState';
import { RootActions } from '../store/rootActions';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@aspnet/signalr'
import { ofType } from 'redux-observable';
import { STREAMING_CONNECT_ACTION, STREAMING_CONNECTED_ACTION, STREAMING_DISCONNECT_ACTION, STREAMING_DISCONNECTED_ACTION, DisconnectedAction } from '../reducers/streamingActions';
import { StreamingActions } from '../reducers/streamingActions';


export const createSignalrEpic = () => (actions$: Observable<RootActions>, state$: Observable<RootState>) => {
    //Create subject
    const signalrEpicSubject = new Subject<RootActions>();

    const hubConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl("https://localhost:5043/clients")
        .build();

    const connect$ = handleConnectAction(hubConnection, actions$, state$);
    const diconnect$ = handleDisconnectAction(hubConnection, actions$, state$);

    connect$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    diconnect$.subscribe({ next: (action) => signalrEpicSubject.next(action) });

    hubConnection.onclose((err) => signalrEpicSubject.next({
        type: STREAMING_DISCONNECTED_ACTION
    }));

    return signalrEpicSubject;
};

const handleConnectAction = (hubConnection: HubConnection, actions$: Observable<RootActions>, state$: Observable<RootState>): Observable<StreamingActions> => {
    return actions$.pipe(
        ofType(STREAMING_CONNECT_ACTION),
        mergeMap(_ => {

            return defer(async () => {
                try {
                    await hubConnection.start()
                    return ({
                        type: STREAMING_CONNECTED_ACTION
                    });
                } catch (error) {
                    return ({
                        type: STREAMING_DISCONNECTED_ACTION
                    });
                }
            });
        }),
        map(action => {
            return action as StreamingActions
        })
    )
};


const handleDisconnectAction = (hubConnection: HubConnection, actions$: Observable<RootActions>, state$: Observable<RootState>): Observable<StreamingActions> => {
    return actions$.pipe(
        ofType(STREAMING_DISCONNECT_ACTION),
        mergeMap(_ => {
            return defer(async () => {
                await hubConnection.stop();

                return ({
                    type: STREAMING_DISCONNECTED_ACTION
                });
            });
        }),
        map(action => {
            return action as DisconnectedAction
        })
    )
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