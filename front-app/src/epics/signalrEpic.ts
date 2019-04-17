import { Observable, defer, Subject, Observer } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@aspnet/signalr'
import { ofType } from 'redux-observable';
import { RootState } from '../store/rootState';
import { RootAction } from '../store/rootActions';
import { SIGNALR_CONNECT_ACTION, SIGNALR_ON_CONNECTED_ACTION, SIGNALR_DISCONNECT_ACTION, SIGNALR_ON_DISCONNECTED_ACTION, onSignalRConnected, onSignalRDisconnected } from '../reducers/connectivityActions';
import { ConnectAction, DisconnectAction, ConnectivityAction } from '../reducers/connectivityActions';
import { SubscribeToSharedProductAction, SUBSCRIBE_TO_SHARED_PRODUCT_ACTION, SharedProductPriceAction, updateSharedProductPrice, SUBSCRIBE_TO_UNIQUE_PRODUCT_ACTION, SubscribeToUniqueProductAction, UniqueProductPriceAction, updateUniqueProductPrice } from '../reducers/pricerActions';


export const createSignalrEpic = () => (actions$: Observable<RootAction>, state$: Observable<RootState>) => {
    //Create subject
    const signalrEpicSubject = new Subject<RootAction>();

    const hubConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl("https://localhost:5043/clients")
        .build();

    const connect$ = handleConnectAction(hubConnection, actions$, state$);
    const diconnect$ = handleDisconnectAction(hubConnection, actions$, state$);
    const subscribeToSharedProduct$ = handleSubscribeToSharedProduct(hubConnection, actions$, state$);
    const subscribeToUniqueProduct$ = handleSubscribeToUniqueProduct(hubConnection, actions$, state$);

    connect$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    diconnect$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    subscribeToSharedProduct$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    subscribeToUniqueProduct$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    
    hubConnection.onclose((err) => signalrEpicSubject.next(onSignalRDisconnected()));

    return signalrEpicSubject;
};

const handleConnectAction = (hubConnection: HubConnection, actions$: Observable<RootAction>, state$: Observable<RootState>): Observable<ConnectivityAction> => {
    return actions$.pipe(
        ofType<RootAction, ConnectAction>(SIGNALR_CONNECT_ACTION),
        mergeMap(_ => {
            return defer(async () => {
                try {
                    await hubConnection.start();

                    return onSignalRConnected();
                } catch (error) {
                    return onSignalRDisconnected();
                }
            });
        })
    )
};

const handleDisconnectAction = (hubConnection: HubConnection, actions$: Observable<RootAction>, state$: Observable<RootState>): Observable<ConnectivityAction> => {
    return actions$.pipe(
        ofType<RootAction, DisconnectAction>(SIGNALR_DISCONNECT_ACTION),
        mergeMap(_ => {
            return defer(async () => {
                await hubConnection.stop();

                return onSignalRDisconnected();
            });
        })
    )
};

interface SharedProductNewPrice {
    productId: string,
    price: string
}

const handleSubscribeToSharedProduct = (hubConnection: HubConnection, actions$: Observable<RootAction>, state$: Observable<RootState>): Observable<SharedProductPriceAction> => {
    return actions$.pipe(
        ofType<RootAction, SubscribeToSharedProductAction>(SUBSCRIBE_TO_SHARED_PRODUCT_ACTION),
        mergeMap(action => {
            return Observable.create((observer: Observer<SharedProductPriceAction>) => {
                const streamResult = hubConnection.stream<SharedProductNewPrice>("SubscribeToSharedProduct", action.productId)

                streamResult.subscribe(observer);
            }) as Observable<SharedProductPriceAction>;
        }),
        map(action => updateSharedProductPrice(action.productId, action.price))
    );
};

interface UniqueProductNewPrice {
    productId: string,
    price: string
}

const handleSubscribeToUniqueProduct = (hubConnection: HubConnection, actions$: Observable<RootAction>, state$: Observable<RootState>): Observable<UniqueProductPriceAction> => {
    return actions$.pipe(
        ofType<RootAction, SubscribeToUniqueProductAction>(SUBSCRIBE_TO_UNIQUE_PRODUCT_ACTION),
        mergeMap(action => {
            console.log('dfsfdsf')
            return Observable.create((observer: Observer<UniqueProductPriceAction>) => {
                const streamResult = hubConnection.stream<UniqueProductNewPrice>("SubscribeToUniqueProduct", action.productId)

                streamResult.subscribe(observer);
            }) as Observable<UniqueProductPriceAction>;
        }),
        map(action => updateUniqueProductPrice(action.productId, action.price))
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                        UNSUBSCRIBE TO STREAM                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// subscription.dispose();