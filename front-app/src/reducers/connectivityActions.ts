export type ConnectivityAction =
    | ConnectAction
    | ConnectedAction
    | DisconnectAction
    | DisconnectedAction
    ;

export const SIGNALR_CONNECT_ACTION = 'SIGNALR_CONNECT_ACTION';
export interface ConnectAction {
    type: 'SIGNALR_CONNECT_ACTION'
};

export const SIGNALR_CONNECTED_ACTION = 'SIGNALR_CONNECTED_ACTION';
export interface ConnectedAction {
    type: 'SIGNALR_CONNECTED_ACTION'
};

export const SIGNALR_DISCONNECT_ACTION = 'SIGNALR_DISCONNECT_ACTION';
export interface DisconnectAction {
    type: 'SIGNALR_DISCONNECT_ACTION'
};

export const SIGNALR_DISCONNECTED_ACTION = 'SIGNALR_DISCONNECTED_ACTION';
export interface DisconnectedAction {
    type: 'SIGNALR_DISCONNECTED_ACTION'
};
