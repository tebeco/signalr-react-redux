import { Observable, defer, Subject, Observer } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@aspnet/signalr'
import { ofType } from 'redux-observable';
import { RootState } from '../store/rootState';
import { RootAction } from '../store/rootActions';
import { STREAMING_CONNECT_ACTION, STREAMING_CONNECTED_ACTION, STREAMING_DISCONNECT_ACTION, STREAMING_DISCONNECTED_ACTION } from '../reducers/streamingActions';
import { DisconnectedAction, ConnectAction, DisconnectAction, StreamingAction } from '../reducers/streamingActions';
import { SubscribeToProductAction, STREAMING_SUBSCRIBE_TO_PRODUCT_ACTION, NewPriceAction } from '../reducers/pricerActions';


export const createSignalrEpic = () => (actions$: Observable<RootAction>, state$: Observable<RootState>) => {
    //Create subject
    const signalrEpicSubject = new Subject<RootAction>();

    const hubConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl("https://localhost:5043/clients")
        .build();

    const connect$ = handleConnectAction(hubConnection, actions$, state$);
    const diconnect$ = handleDisconnectAction(hubConnection, actions$, state$);
    const subscribe$ = handleSubscribeToProduct(hubConnection, actions$, state$);

    connect$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    diconnect$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    subscribe$.subscribe({ next: (action) => signalrEpicSubject.next(action) });

    hubConnection.onclose((err) => signalrEpicSubject.next({
        type: STREAMING_DISCONNECTED_ACTION
    }));

    return signalrEpicSubject;
};

const handleConnectAction = (hubConnection: HubConnection, actions$: Observable<RootAction>, state$: Observable<RootState>): Observable<StreamingAction> => {
    return actions$.pipe(
        ofType<RootAction, ConnectAction>(STREAMING_CONNECT_ACTION),
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
            return action as StreamingAction
        })
    )
};

const handleDisconnectAction = (hubConnection: HubConnection, actions$: Observable<RootAction>, state$: Observable<RootState>): Observable<StreamingAction> => {
    return actions$.pipe(
        ofType<RootAction, DisconnectAction>(STREAMING_DISCONNECT_ACTION),
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

interface ProductNewPrice {
    id: string,
    price: string
}
const handleSubscribeToProduct = (hubConnection: HubConnection, actions$: Observable<RootAction>, state$: Observable<RootState>): Observable<NewPriceAction> => {
    return actions$.pipe(
        ofType<RootAction, SubscribeToProductAction>(STREAMING_SUBSCRIBE_TO_PRODUCT_ACTION),
        mergeMap(action => {
            return Observable.create((observer: Observer<NewPriceAction>) => {
                const streamResult = hubConnection.stream<ProductNewPrice>("SubscribeToSharedProduct", action.product)

                streamResult.subscribe({
                    next: (msg) => {
                        observer.next({
                            type: 'NEW_PRICE_ACTION',
                            product: msg.id,
                            price: msg.price
                        } as NewPriceAction);
                    },
                    error: (err) => {
                        console.log(err);
                        observer.complete();
                    },
                    complete: () => {
                        observer.complete();
                    }
                });
            }) as Observable<NewPriceAction>;
        })
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          UNSUBSCRIBE TO STREAM                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// subscription.dispose();