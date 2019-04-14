import { WorkspaceState, initialWorkspaceState, TileState } from '../store/rootState';
import { NewPriceAction } from './streamingActions';

export const workspaceReducer = (state: WorkspaceState = initialWorkspaceState, action: NewPriceAction): WorkspaceState => {
    switch (action.type) {
        case 'NEW_PRICE_ACTION':
            Object.keys
            const updatedTiles = Object
                .values(state.tiles)
                .filter(tile => tile.type === "SHARED_PRODUCT_STATE" && tile.product === action.product)
                .map(tile => ({ ...tile, price: action.price }))
                .reduce((acc, current) => ({ ...acc, [current.id]: current }), {} as Record<string, TileState>);

            return { ...state, tiles: { ...state.tiles, ...updatedTiles } };
        default:
            return state;
    }
}

