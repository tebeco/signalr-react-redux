export type ConnectivityAction =
    | ConnectAction
    | DisconnectAction
    | OnConnectedAction
    | OnDisconnectingAction
    | OnDisconnectedAction
    ;

export const SIGNALR_CONNECT_ACTION = 'SIGNALR_CONNECT_ACTION';
export interface ConnectAction {
    type: 'SIGNALR_CONNECT_ACTION'
};

export const SIGNALR_DISCONNECT_ACTION = 'SIGNALR_DISCONNECT_ACTION';
export interface DisconnectAction {
    type: 'SIGNALR_DISCONNECT_ACTION'
};

export const SIGNALR_ON_CONNECTED_ACTION = 'SIGNALR_ON_CONNECTED_ACTION';
export interface OnConnectedAction {
    type: 'SIGNALR_ON_CONNECTED_ACTION'
};

export const SIGNALR_ON_DISCONNECTED_ACTION = 'SIGNALR_ON_DISCONNECTED_ACTION';
export interface OnDisconnectedAction {
    type: 'SIGNALR_ON_DISCONNECTED_ACTION'
};

export const SIGNALR_ON_DISCONNECTING_ACTION = 'SIGNALR_ON_DISCONNECTING_ACTION';
export interface OnDisconnectingAction {
    type: 'SIGNALR_ON_DISCONNECTING_ACTION'
};

export const onSignalRConnected = (): OnConnectedAction => ({
    type: 'SIGNALR_ON_CONNECTED_ACTION'
});

export const onSignalRDisconnecting = (): OnDisconnectingAction => ({
    type: 'SIGNALR_ON_DISCONNECTING_ACTION'
});

export const onSignalRDisconnected = (): OnDisconnectedAction => ({
    type: 'SIGNALR_ON_DISCONNECTED_ACTION'
});