import { LimitedProductTile } from "../components/LimitedProductTile/LimitedProductTile";

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
    createDefaultInfinteProductTile('1', 'productId1'),
    createDefaultInfinteProductTile('2', 'productId1'),
    createDefaultLimitedProductTile('3', 'productId3'),
    createDefaultErrorTile('4'),
];

export const initialWorkspaceState = {
    tiles: initialTiles.reduce((acc, current) => ({ ...acc, [current.tileId]: current }), {} as Record<string, TileState>),
};
