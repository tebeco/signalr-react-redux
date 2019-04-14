export type ProductAction =
    | InfiniteProductAction
    | LimitedProductAction
    ;

////////////////////////////////////////////
////////////////////// INFINITE PRODUCT
////////////////////////////////////////////

export type InfiniteProductAction = 
    | SubscribeToInfiniteProductAction
    | SubscribedToInfiniteProductAction
    | UnsubscribedToInfiniteProductAction
    | InfiniteProductPriceAction
    ;

export const SUBSCRIBE_TO_INFINITE_PRODUCT_ACTION = 'SUBSCRIBE_TO_INFINITE_PRODUCT_ACTION';
export interface SubscribeToInfiniteProductAction {
    type: 'SUBSCRIBE_TO_INFINITE_PRODUCT_ACTION'
    productId: string
}

export const SUBSCRIBED_TO_INFINITE_PRODUCT_ACTION = 'SUBSCRIBED_TO_INFINITE_PRODUCT_ACTION';
export interface SubscribedToInfiniteProductAction {
    type: 'SUBSCRIBED_TO_INFINITE_PRODUCT_ACTION'
    productId: string
}

export const UNSUBSCRIBED_TO_INFINITE_PRODUCT_ACTION = 'UNSUBSCRIBED_TO_INFINITE_PRODUCT_ACTION';
export interface UnsubscribedToInfiniteProductAction {
    type: 'UNSUBSCRIBED_TO_INFINITE_PRODUCT_ACTION'
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

export const onSubscribedToInfiniteProductAction = (productId: string): SubscribedToInfiniteProductAction => ({
    type: 'SUBSCRIBED_TO_INFINITE_PRODUCT_ACTION',
    productId,
});

export const onUnsubscribedToInfiniteProductAction = (productId: string): UnsubscribedToInfiniteProductAction => ({
    type: 'UNSUBSCRIBED_TO_INFINITE_PRODUCT_ACTION',
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

export type LimitedProductAction = 
    | SubscribeToLimitedProductAction
    | SubscribedToLimitedProductAction
    | UnsubscribedToLimitedProductAction
    | LimitedProductPriceAction
    ;

export const SUBSCRIBE_TO_LIMITED_PRODUCT_ACTION = 'SUBSCRIBE_TO_LIMITED_PRODUCT_ACTION';
export interface SubscribeToLimitedProductAction {
    type: 'SUBSCRIBE_TO_LIMITED_PRODUCT_ACTION'
    productId: string
}

export const SUBSCRIBED_TO_LIMITED_PRODUCT_ACTION = 'SUBSCRIBED_TO_LIMITED_PRODUCT_ACTION';
export interface SubscribedToLimitedProductAction {
    type: 'SUBSCRIBED_TO_LIMITED_PRODUCT_ACTION'
    productId: string
}
export const UNSUBSCRIBED_TO_LIMITED_PRODUCT_ACTION = 'UNSUBSCRIBED_TO_LIMITED_PRODUCT_ACTION';
export interface UnsubscribedToLimitedProductAction {
    type: 'UNSUBSCRIBED_TO_LIMITED_PRODUCT_ACTION'
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

export const onSubscribedToLimitedProductAction = (productId: string):  SubscribedToLimitedProductAction => ({
    type: 'SUBSCRIBED_TO_LIMITED_PRODUCT_ACTION',
    productId,
});

export const onUnsubscribedToLimitedProductAction = (productId: string):  UnsubscribedToLimitedProductAction => ({
    type: 'UNSUBSCRIBED_TO_LIMITED_PRODUCT_ACTION',
    productId,
});

export const updateLimitedProductPrice = (productId: string, price: string): LimitedProductPriceAction => ({
    type: 'LIMITED_PRODUCT_PRICE_ACTION',
    productId,
    price,
});