import { streamingReducer } from "./connectivityReducer";

export type ProductAction =
    | SharedProductAction
    | UniqueProductAction
    ;

////////////////////////////////////////////
////////////////////// UNIQUE PRODUCT
////////////////////////////////////////////

type SharedProductAction = 
    | SubscribeToSharedProductAction
    | SharedProductPriceAction
    ;

export const SUBSCRIBE_TO_SHARED_PRODUCT_ACTION = 'SUBSCRIBE_TO_SHARED_PRODUCT_ACTION';
export interface SubscribeToSharedProductAction {
    type: 'SUBSCRIBE_TO_SHARED_PRODUCT_ACTION'
    productId: string
}

export const SHARED_PRODUCT_PRICE_ACTION = 'SHARED_PRODUCT_PRICE_ACTION'
export interface SharedProductPriceAction {
    type: 'SHARED_PRODUCT_PRICE_ACTION',
    productId: string
    price: string
}

export const subscribeToSharedProductAction = (productId: string): SubscribeToSharedProductAction => ({
    type: 'SUBSCRIBE_TO_SHARED_PRODUCT_ACTION',
    productId,
});

export const updateSharedProductPrice = (productId: string, price: string): SharedProductPriceAction => ({
    type: 'SHARED_PRODUCT_PRICE_ACTION',
    productId,
    price,
});

////////////////////////////////////////////
////////////////////// UNIQUE PRODUCT
////////////////////////////////////////////

type UniqueProductAction = 
    | SubscribeToUniqueProductAction
    | UniqueProductPriceAction
    ;

export const SUBSCRIBE_TO_UNIQUE_PRODUCT_ACTION = 'SUBSCRIBE_TO_UNIQUE_PRODUCT_ACTION';
export interface SubscribeToUniqueProductAction {
    type: 'SUBSCRIBE_TO_UNIQUE_PRODUCT_ACTION'
    productId: string
}

export const UNIQUE_PRODUCT_PRICE_ACTION = 'UNIQUE_PRODUCT_PRICE_ACTION'
export interface UniqueProductPriceAction {
    type: 'UNIQUE_PRODUCT_PRICE_ACTION',
    productId: string
    price: string
}

export const subscribeToUniqueProductAction = (productId: string): SubscribeToUniqueProductAction => ({
    type: 'SUBSCRIBE_TO_UNIQUE_PRODUCT_ACTION',
    productId,
});

export const updateUniqueProductPrice = (productId: string, price: string): UniqueProductPriceAction => ({
    type: 'UNIQUE_PRODUCT_PRICE_ACTION',
    productId,
    price,
});