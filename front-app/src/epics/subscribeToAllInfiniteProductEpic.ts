import { ofType, StateObservable, ActionsObservable } from 'redux-observable'
import { subscribeToInfiniteProduct } from '../reducers/pricerActions';
import { RootAction } from '../store/rootActions';
import { RootState } from '../store/rootState';
import { withLatestFrom, map, filter, concatAll } from 'rxjs/operators';
import { OnConnectedAction, SIGNALR_ON_CONNECTED_ACTION } from '../reducers/connectivityActions';
import { InfinteProductTileState } from '../store/workspaceState';

export const subscribeToAllInfiniteProductEpic = () => (actions$: ActionsObservable<RootAction>, state$: StateObservable<RootState>) => {
    return actions$.pipe(
        ofType<RootAction, OnConnectedAction>(SIGNALR_ON_CONNECTED_ACTION),
        withLatestFrom(state$),
        map(([_, state]) => Object.values(state.workspace.tiles)),
        concatAll(),
        filter(tileState => tileState.type === "INFINITE_PRODUCT_STATE"),
        map(tileState =>  tileState as InfinteProductTileState),
        map(infiniteProduct => subscribeToInfiniteProduct(infiniteProduct.productId))
    );
}
