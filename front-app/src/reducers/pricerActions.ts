import { streamingReducer } from "./connectivityReducer";

export type ProductAction =
    | InfinteProductAction
    | LimitedProductAction
    ;

////////////////////////////////////////////
////////////////////// INFINITE PRODUCT
////////////////////////////////////////////

type InfinteProductAction = 
    | SubscribeToInfiniteProductAction
    | InfiniteProductPriceAction
    ;

export const SUBSCRIBE_TO_INFINITE_PRODUCT_ACTION = 'SUBSCRIBE_TO_INFINITE_PRODUCT_ACTION';
export interface SubscribeToInfiniteProductAction {
    type: 'SUBSCRIBE_TO_INFINITE_PRODUCT_ACTION'
    productId: string
}

export const INFINITE_PRODUCT_PRICE_ACTION = 'INFINITE_PRODUCT_PRICE_ACTION'
export interface InfiniteProductPriceAction {
    type: 'INFINITE_PRODUCT_PRICE_ACTION',
    productId: string
    price: string
}

export const subscribeToInfiniteProductAction = (productId: string): SubscribeToInfiniteProductAction => ({
    type: 'SUBSCRIBE_TO_INFINITE_PRODUCT_ACTION',
    productId,
});

export const updateInfiniteProductPrice = (productId: string, price: string): InfiniteProductPriceAction => ({
    type: 'INFINITE_PRODUCT_PRICE_ACTION',
    productId,
    price,
});

////////////////////////////////////////////
////////////////////// LIMITED PRODUCT
////////////////////////////////////////////

type LimitedProductAction = 
    | SubscribeToLimitedProductAction
    | LimitedProductPriceAction
    ;

export const SUBSCRIBE_TO_LIMITED_PRODUCT_ACTION = 'SUBSCRIBE_TO_LIMITED_PRODUCT_ACTION';
export interface SubscribeToLimitedProductAction {
    type: 'SUBSCRIBE_TO_LIMITED_PRODUCT_ACTION'
    productId: string
}

export const LIMITED_PRODUCT_PRICE_ACTION = 'LIMITED_PRODUCT_PRICE_ACTION'
export interface LimitedProductPriceAction {
    type: 'LIMITED_PRODUCT_PRICE_ACTION',
    productId: string
    price: string
}

export const subscribeToLimitedProductAction = (productId: string): SubscribeToLimitedProductAction => ({
    type: 'SUBSCRIBE_TO_LIMITED_PRODUCT_ACTION',
    productId,
});

export const updateLimitedProductPrice = (productId: string, price: string): LimitedProductPriceAction => ({
    type: 'LIMITED_PRODUCT_PRICE_ACTION',
    productId,
    price,
});