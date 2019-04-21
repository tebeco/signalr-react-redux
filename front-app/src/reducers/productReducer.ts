import { ProductAction } from "./pricerActions";
import { WorkspaceState, TileState, initialWorkspaceState } from "../store/workspaceState";
import { ConnectivityAction } from "./connectivityActions";

export const workspaceReducer = (state: WorkspaceState = initialWorkspaceState, action: ProductAction | ConnectivityAction): WorkspaceState => {
    switch (action.type) {
        case 'LIMITED_PRODUCT_PRICE_ACTION':
        case 'INFINITE_PRODUCT_PRICE_ACTION':
            const updatedTiles = Object
                .values(state.tiles)
                .filter(tile => (tile.type === "INFINITE_PRODUCT_STATE" || tile.type === "LIMITED_PRODUCT_STATE") && tile.productId === action.productId)
                .map(tile => ({ ...tile, price: action.price }))
                .reduce((acc, current) => ({ ...acc, [current.tileId]: current }), {} as Record<string, TileState>);

            return { ...state, tiles: { ...state.tiles, ...updatedTiles } };
        case 'SIGNALR_ON_DISCONNECTED_ACTION':
            const resetedTiles = Object
                .values(state.tiles)
                .filter(tile => (tile.type === "INFINITE_PRODUCT_STATE" || tile.type === "LIMITED_PRODUCT_STATE"))
                .map(tile => ({ ...tile, price: '-' }))
                .reduce((acc, current) => ({ ...acc, [current.tileId]: current }), {} as Record<string, TileState>);

            return { ...state, tiles: { ...state.tiles, ...resetedTiles } };
        default:
            return state;
    }
}