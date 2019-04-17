import { ProductAction, SharedProductPriceAction } from "./pricerActions";
import { WorkspaceState, TileState, initialWorkspaceState } from "../store/workspaceState";

export const workspaceReducer = (state: WorkspaceState = initialWorkspaceState, action: ProductAction): WorkspaceState => {
    switch (action.type) {
        case 'UNIQUE_PRODUCT_PRICE_ACTION':
        case 'SHARED_PRODUCT_PRICE_ACTION':
            const updatedTiles = Object
                .values(state.tiles)
                .filter(tile => (tile.type === "SHARED_PRODUCT_STATE" || tile.type === "UNIQUE_PRODUCT_STATE") && tile.productId === action.productId)
                .map(tile => ({ ...tile, price: action.price }))
                .reduce((acc, current) => ({ ...acc, [current.tileId]: current }), {} as Record<string, TileState>);

            return { ...state, tiles: { ...state.tiles, ...updatedTiles } };
        default:
            return state;
    }
}

