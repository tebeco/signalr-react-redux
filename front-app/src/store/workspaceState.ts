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
    productId: string;
    price: string | '-';
}

export interface WorkspaceState {
    tiles: Record<string, TileState>
}

const createDefaultSharedProductTile = (id: string, productId: string): SharedProductTileState => ({ id, type: 'SHARED_PRODUCT_STATE', productId, price: '-' });
const createDefaultErrorTile = (id: string) : ErrorTileState => ({ id, type: 'ERROR_TILE_STATE' });
const tiles: TileState[] = [
    createDefaultSharedProductTile('1', 'productId1'),
    createDefaultSharedProductTile('2', 'productId1'),
    createDefaultSharedProductTile('3', 'productId3'),
    createDefaultSharedProductTile('4', 'productId4'),
    createDefaultErrorTile('5'),
    createDefaultSharedProductTile('6', 'productId6'),
]

export const initialWorkspaceState = {
    tiles: tiles.reduce((acc, current) => ({ ...acc, [current.id]: current }), {} as Record<string, TileState>),
};
