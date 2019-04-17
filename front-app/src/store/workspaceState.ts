import { UniqueProductTile } from "../components/UniqueProductTile/UniqueProductTile";

export type TileState =
    | ErrorTileState
    | SharedProductTileState
    | UniqueProductTileState
    ;

export const ERROR_TILE_STATE = 'ERROR_TILE_STATE';
export interface ErrorTileState {
    type: 'ERROR_TILE_STATE'
    tileId: string;
}

export const SHARED_PRODUCT_STATE = 'SHARED_PRODUCT_STATE';
export interface SharedProductTileState {
    type: 'SHARED_PRODUCT_STATE'
    tileId: string;
    productId: string;
    price: string | '-';
}

export const UNIQUE_PRODUCT_STATE = 'UNIQUE_PRODUCT_STATE';
export interface UniqueProductTileState {
    type : 'UNIQUE_PRODUCT_STATE'
    tileId: string;
    productId: string;
    price: string | '-';
}

export interface WorkspaceState {
    tiles: Record<string, TileState>
}

const createDefaultSharedProductTile = (tileId: string, productId: string): SharedProductTileState => ({ tileId, type: 'SHARED_PRODUCT_STATE', productId, price: '-' });
const createDefaultUniqueProductTile = (tileId: string, productId: string): UniqueProductTileState => ({ tileId, type: 'UNIQUE_PRODUCT_STATE', productId, price: '-' });

const createDefaultErrorTile = (tileId: string) : ErrorTileState => ({ tileId, type: 'ERROR_TILE_STATE' });

const tiles: TileState[] = [
    createDefaultSharedProductTile('1', 'productId1'),
    createDefaultSharedProductTile('2', 'productId1'),
    createDefaultUniqueProductTile('3', 'productId3'),
    createDefaultErrorTile('4'),
];

export const initialWorkspaceState = {
    tiles: tiles.reduce((acc, current) => ({ ...acc, [current.tileId]: current }), {} as Record<string, TileState>),
};
