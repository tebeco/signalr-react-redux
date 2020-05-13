import { Observable, defer, Subject, Observer } from 'rxjs';
import { mergeMap, map, tap, withLatestFrom, filter } from 'rxjs/operators';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr'
import { ofType, StateObservable, ActionsObservable } from 'redux-observable';
import { RootState } from '../store/rootState';
import { RootAction } from '../store/rootActions';
import { SIGNALR_CONNECT_ACTION, SIGNALR_DISCONNECT_ACTION, onSignalRConnected, onSignalRDisconnected, onSignalRDisconnecting, disconnectFromSignalR } from '../reducers/connectivityActions';
import { ConnectAction, DisconnectAction, ConnectivityAction } from '../reducers/connectivityActions';
import { SubscribeToInfiniteProductAction, SUBSCRIBE_TO_INFINITE_PRODUCT_ACTION, updateInfiniteProductPrice, SUBSCRIBE_TO_LIMITED_PRODUCT_ACTION, SubscribeToLimitedProductAction, LimitedProductAction, updateLimitedProductPrice, onSubscribedToLimitedProduct, onUnsubscribedToLimitedProduct, InfiniteProductAction, onSubscribedToInfiniteProduct, onUnsubscribedToInfiniteProduct } from '../reducers/pricerActions';


export const createSignalrEpic = () => (actions$: ActionsObservable<RootAction>, state$: StateObservable<RootState>) => {
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
    const serverCommands$ = handleServerCommands(hubConnection, actions$, state$)

    connect$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    diconnect$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    subscribeToInfiniteProduct$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    subscribeToLimitedProduct$.subscribe({ next: (action) => signalrEpicSubject.next(action) });
    serverCommands$.subscribe({ next: (action) => signalrEpicSubject.next(action) });

    hubConnection.onclose((err) => {
        signalrEpicSubject.next(onSignalRDisconnected());
    });

    return signalrEpicSubject;
};

const handleConnectAction = (hubConnection: HubConnection, actions$: ActionsObservable<RootAction>, state$: StateObservable<RootState>): Observable<ConnectivityAction> => {
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

const handleDisconnectAction = (hubConnection: HubConnection, actions$: ActionsObservable<RootAction>, state$: StateObservable<RootState>): Observable<ConnectivityAction> => {
    return actions$.pipe(
        ofType<RootAction, DisconnectAction>(SIGNALR_DISCONNECT_ACTION),
        map(_ => onSignalRDisconnecting()),
        tap(_ => hubConnection.stop())
    )
};

interface ProductNewPrice {
    productId: string,
    price: string
}

type InfiniteProductNewPrice = ProductNewPrice;

const handleSubscribeToInfiniteProduct = (hubConnection: HubConnection, actions$: ActionsObservable<RootAction>, state$: StateObservable<RootState>): Observable<InfiniteProductAction> => {
    return actions$.pipe(
        ofType<RootAction, SubscribeToInfiniteProductAction>(SUBSCRIBE_TO_INFINITE_PRODUCT_ACTION),
        withLatestFrom(state$),
        filter(([action, state]) => {
            return state.streaming.infiniteSubscriptions.filter(infiniteSubscription => infiniteSubscription.productId === action.productId).length === 0;
        }),
        mergeMap(([action, _]) => {
            return Observable.create((observer: Observer<InfiniteProductAction>) => {
                const streamResult = hubConnection.stream<InfiniteProductNewPrice>("SubscribeToInfiniteProduct", action.productId);

                const unsubscribe = (observer: Observer<InfiniteProductAction>, productId: string) => {
                    observer.next(onUnsubscribedToInfiniteProduct(action.productId));
                    observer.complete();
                }

                streamResult.subscribe({
                    next: (newPrice) => observer.next(updateInfiniteProductPrice(newPrice.productId, newPrice.price)),
                    error: (_) => unsubscribe(observer, action.productId),
                    complete: () => unsubscribe(observer, action.productId),
                });

                observer.next(onSubscribedToInfiniteProduct(action.productId));
            }) as Observable<InfiniteProductAction>;
        })
    );
};


type LimitedProductNewPrice = ProductNewPrice;

const handleSubscribeToLimitedProduct = (hubConnection: HubConnection, actions$: ActionsObservable<RootAction>, state$: StateObservable<RootState>): Observable<LimitedProductAction> => {
    return actions$.pipe(
        ofType<RootAction, SubscribeToLimitedProductAction>(SUBSCRIBE_TO_LIMITED_PRODUCT_ACTION),
        withLatestFrom(state$),
        filter(([action, state]) => {
            return state.streaming.limitedSubscriptions.filter(limitedSubscription => limitedSubscription.productId === action.productId).length === 0;
        }),
        mergeMap(([action, _]) => {
            return Observable.create((observer: Observer<LimitedProductAction>) => {
                const streamResult = hubConnection.stream<LimitedProductNewPrice>("SubscribeToLimitedProduct", action.productId);

                const unsubscribe = (observer: Observer<LimitedProductAction>, productId: string) => {
                    observer.next(onUnsubscribedToLimitedProduct(action.productId));
                    observer.complete();
                }

                streamResult.subscribe({
                    next: (newPrice) => observer.next(updateLimitedProductPrice(newPrice.productId, newPrice.price)),
                    error: (_) => unsubscribe(observer, action.productId),
                    complete: () => unsubscribe(observer, action.productId),
                });

                observer.next(onSubscribedToLimitedProduct(action.productId));
            }) as Observable<LimitedProductAction>;
        })
    );
};

const handleServerCommands = (hubConnection: HubConnection, actions$: ActionsObservable<RootAction>, state$: StateObservable<RootState>): Observable<RootAction> => {
    const serverCommands = new Subject<DisconnectAction>();
    hubConnection.on("disconnect", _ => {
        console.log('disconnect');
        serverCommands.next(disconnectFromSignalR());
    });
    return serverCommands;
}
