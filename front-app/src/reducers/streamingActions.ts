export type StreamingAction =
    | ConnectAction
    | ConnectedAction
    | DisconnectAction
    | DisconnectedAction
    | SubscribeToProductAction
    | SubscribedToProductAction
    | NewPriceAction
    ;

export const STREAMING_CONNECT_ACTION = 'STREAMING_CONNECT_ACTION';
export interface ConnectAction {
    type: 'STREAMING_CONNECT_ACTION'
};

export const STREAMING_CONNECTED_ACTION = 'STREAMING_CONNECTED_ACTION';
export interface ConnectedAction {
    type: 'STREAMING_CONNECTED_ACTION'
};

export const STREAMING_DISCONNECT_ACTION = 'STREAMING_DISCONNECT_ACTION';
export interface DisconnectAction {
    type: 'STREAMING_DISCONNECT_ACTION'
};

export const STREAMING_DISCONNECTED_ACTION = 'STREAMING_DISCONNECTED_ACTION';
export interface DisconnectedAction {
    type: 'STREAMING_DISCONNECTED_ACTION'
};

export const STREAMING_SUBSCRIBE_TO_PRODUCT_ACTION = 'STREAMING_SUBSCRIBE_TO_PRODUCT_ACTION';
export interface SubscribeToProductAction {
    type: 'STREAMING_SUBSCRIBE_TO_PRODUCT_ACTION'
    product: string
}

export const STREAMING_SUBSCRIBED_TO_PRODUCT_ACTION = 'STREAMING_SUBSCRIBED_TO_PRODUCT_ACTION';
export interface SubscribedToProductAction {
    type: 'STREAMING_SUBSCRIBED_TO_PRODUCT_ACTION'
    product: string
}

export const NEW_PRICE_ACTION = 'NEW_PRICE_ACTION'
export interface NewPriceAction {
    type: 'NEW_PRICE_ACTION',
    product: string
    price: string
}