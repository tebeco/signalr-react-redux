import { SharedProductPriceAction } from "./pricerActions";
import { WorkspaceState, TileState, initialWorkspaceState } from "../store/workspaceState";

export const workspaceReducer = (state: WorkspaceState = initialWorkspaceState, action: SharedProductPriceAction): WorkspaceState => {
    switch (action.type) {
        case 'SHARED_PRODUCT_PRICE_ACTION':
            Object.keys
            const updatedTiles = Object
                .values(state.tiles)
                .filter(tile => tile.type === "SHARED_PRODUCT_STATE" && tile.productId === action.productId)
                .map(tile => ({ ...tile, price: action.price }))
                .reduce((acc, current) => ({ ...acc, [current.id]: current }), {} as Record<string, TileState>);

            return { ...state, tiles: { ...state.tiles, ...updatedTiles } };
        default:
            return state;
    }
}

