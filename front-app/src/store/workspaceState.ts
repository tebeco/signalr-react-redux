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

const createDefaultSharedProductTile = (id: string, product: string): SharedProductTileState => ({ id, type: 'SHARED_PRODUCT_STATE', productId: product, price: '-' })

const tiles: TileState[] = [
    createDefaultSharedProductTile('1', 'productId1'),
    createDefaultSharedProductTile('2', 'productId1'),
    createDefaultSharedProductTile('3', 'productId3'),
    createDefaultSharedProductTile('4', 'productId4'),
    { id: '5', type: 'ERROR_TILE_STATE' },
    createDefaultSharedProductTile('6', 'productId6'),
]

const initialTiles = tiles.reduce((acc, current) => ({ ...acc, [current.id]: current }), {} as Record<string, TileState>)

export const initialWorkspaceState = {
    tiles: initialTiles,
};
