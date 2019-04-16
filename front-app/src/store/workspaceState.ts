export type TileState =
    | ErrorTileState
    | SharedProductTileState

export const ERROR_TILE_STATE = 'ERROR_TILE_STATE'
export interface ErrorTileState {
    type: 'ERROR_TILE_STATE'
    id: string;
}

export const SHARED_PRODUCT_STATE = 'SHARED_PRODUCT_STATE';
export interface SharedProductTileState {
    id: string;
    type: 'SHARED_PRODUCT_STATE'
    product: string;
    price: string | '-';
}

export interface WorkspaceState {
tiles: Record<string, TileState>
}


const tiles: TileState[] = [
    { id: '1', product: 'productId1', price: '-', type: 'SHARED_PRODUCT_STATE' },
    { id: '2', product: 'productId2', price: '-', type: 'SHARED_PRODUCT_STATE' },
    { id: '3', product: 'productId3', price: '-', type: 'SHARED_PRODUCT_STATE' },
    { id: '4', product: 'productId4', price: '-', type: 'SHARED_PRODUCT_STATE' },
    { id: '5', type: 'ERROR_TILE_STATE' },
    { id: '6', product: 'productId6', price: '-', type: 'SHARED_PRODUCT_STATE' },
    { id: '7', product: 'productId1', price: '-', type: 'SHARED_PRODUCT_STATE' },
    { id: '8', product: 'productId1', price: '-', type: 'SHARED_PRODUCT_STATE' },
]

const initialTiles = tiles.reduce((acc, current) => ({ ...acc, [current.id]: current }), {} as Record<string, TileState>)

export const initialWorkspaceState = {
    tiles: initialTiles,
};
