export type StreamingAction =
    ConnectAction |
    ConnectedAction |
    DisconnectAction |
    DisconnectedAction;

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
