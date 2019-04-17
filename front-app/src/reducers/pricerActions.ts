import { streamingReducer } from "./connectivityReducer";

export type PricerAction =
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
