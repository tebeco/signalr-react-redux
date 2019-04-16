export type PricerAction =
    | SubscribeToProductAction
    | NewPriceAction
    ;

export const STREAMING_SUBSCRIBE_TO_PRODUCT_ACTION = 'STREAMING_SUBSCRIBE_TO_PRODUCT_ACTION';
export interface SubscribeToProductAction {
    type: 'STREAMING_SUBSCRIBE_TO_PRODUCT_ACTION'
    product: string
}

export const NEW_PRICE_ACTION = 'NEW_PRICE_ACTION'
export interface NewPriceAction {
    type: 'NEW_PRICE_ACTION',
    product: string
    price: string
}