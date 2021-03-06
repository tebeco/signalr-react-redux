export type TileState =
    | ErrorTileState
    | InfinteProductTileState
    | LimitedProductTileState
    ;

export const ERROR_TILE_STATE = 'ERROR_TILE_STATE';
export interface ErrorTileState {
    type: 'ERROR_TILE_STATE'
    tileId: string;
}

export const INFINITE_PRODUCT_STATE = 'INFINITE_PRODUCT_STATE';
export interface InfinteProductTileState {
    type: 'INFINITE_PRODUCT_STATE'
    tileId: string;
    productId: string;
    price: string | '-';
}

export const LIMITED_PRODUCT_STATE = 'LIMITED_PRODUCT_STATE';
export interface LimitedProductTileState {
    type : 'LIMITED_PRODUCT_STATE'
    tileId: string;
    productId: string;
    price: string | '-';
}

export interface WorkspaceState {
    tiles: Record<string, TileState>
}


const createDefaultInfinteProductTile = (tileId: string, productId: string): InfinteProductTileState => ({ tileId, type: 'INFINITE_PRODUCT_STATE', productId, price: '-' });
const createDefaultLimitedProductTile = (tileId: string, productId: string): LimitedProductTileState => ({ tileId, type: 'LIMITED_PRODUCT_STATE', productId, price: '-' });
const createDefaultErrorTile = (tileId: string) : ErrorTileState => ({ tileId, type: 'ERROR_TILE_STATE' });

const initialTiles: TileState[] = [
    createDefaultInfinteProductTile('1', 'EUR / USD'),
    createDefaultInfinteProductTile('2', 'EUR / USD'),
    createDefaultLimitedProductTile('3', 'EU / NOR'),
    createDefaultErrorTile('4'),
];

export const initialWorkspaceState = {
    tiles: initialTiles.reduce((acc, current) => ({ ...acc, [current.tileId]: current }), {} as Record<string, TileState>),
};
