import { Observable, defer, Subject, Observer } from 'rxjs';
import { mergeMap, map, tap } from 'rxjs/operators';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@aspnet/signalr'
import { ofType } from 'redux-observable';
import { RootState } from '../store/rootState';
import { RootAction } from '../store/rootActions';
import { SIGNALR_CONNECT_ACTION, SIGNALR_DISCONNECT_ACTION, onSignalRConnected, onSignalRDisconnected, onSignalRDisconnecting } from '../reducers/connectivityActions';
import { ConnectAction, DisconnectAction, ConnectivityAction } from '../reducers/connectivityActions';
import { SubscribeToInfiniteProductAction, SUBSCRIBE_TO_INFINITE_PRODUCT_ACTION, InfiniteProductPriceAction, updateInfiniteProductPrice, SUBSCRIBE_TO_LIMITED_PRODUCT_ACTION, SubscribeToLimitedProductAction, LimitedProductPriceAction, updateLimitedProductPrice } from '../reducers/pricerActions';


export const createSignalrEpic = () => (actions$: Observable<RootAction>, state$: Observable<RootState>) => {
    //Create subject
    const signalrEpicSubject = new Subject<RootAction>();

    const hubConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl("https://localhost:5043/clients")
        .build();

    const connect$ = handleConnectAction(hubConnection, actions$, state$);
    const diconnect$ = handleDisconnectAction(hubConnection, actions$, state$);
    const subscribeToInfiniteProduct$ = handleSubscribeToInfiniteProduct(hubConnection, actions$, state$);
    const subscribeToLimitedProduct$ = handleSubscribeToLimitedProduct(hubConnection, actions$, state$);

    connect$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    diconnect$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    subscribeToInfiniteProduct$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    subscribeToLimitedProduct$.subscribe({ next: (action) => signalrEpicSubject.next(action) });

    hubConnection.onclose((err) => {
        signalrEpicSubject.next(onSignalRDisconnected());
    });

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
        map(_ => onSignalRDisconnecting()),
        tap(_ => hubConnection.stop())
    )
};

interface InfiniteProductNewPrice {
    productId: string,
    price: string
}

const handleSubscribeToInfiniteProduct = (hubConnection: HubConnection, actions$: Observable<RootAction>, state$: Observable<RootState>): Observable<InfiniteProductPriceAction> => {
    return actions$.pipe(
        ofType<RootAction, SubscribeToInfiniteProductAction>(SUBSCRIBE_TO_INFINITE_PRODUCT_ACTION),
        mergeMap(action => {
            return Observable.create((observer: Observer<InfiniteProductPriceAction>) => {
                const streamResult = hubConnection.stream<InfiniteProductNewPrice>("SubscribeToInfiniteProduct", action.productId)

                streamResult.subscribe(observer);

            }) as Observable<InfiniteProductPriceAction>;
        }),
        map(action => updateInfiniteProductPrice(action.productId, action.price))
    );
};

interface LimitedProductNewPrice {
    productId: string,
    price: string
}

const handleSubscribeToLimitedProduct = (hubConnection: HubConnection, actions$: Observable<RootAction>, state$: Observable<RootState>): Observable<LimitedProductPriceAction> => {
    return actions$.pipe(
        ofType<RootAction, SubscribeToLimitedProductAction>(SUBSCRIBE_TO_LIMITED_PRODUCT_ACTION),
        mergeMap(action => {
            return Observable.create((observer: Observer<LimitedProductPriceAction>) => {
                const streamResult = hubConnection.stream<LimitedProductNewPrice>("SubscribeToLimitedProduct", action.productId)

                streamResult.subscribe(observer);
            }) as Observable<LimitedProductPriceAction>;
        }),
        map(action => updateLimitedProductPrice(action.productId, action.price))
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                        UNSUBSCRIBE TO STREAM                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// subscription.dispose();