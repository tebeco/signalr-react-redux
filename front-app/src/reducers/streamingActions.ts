export type StreamingActions =
    ConnectAction |
    ConnectedAction |
    DisconnectAction |
    DisconnectedAction;

export const STREAMING_CONNECT_ACTION = 'STREAMING_CONNECT_ACTION';
export type ConnectAction = {
    type: 'STREAMING_CONNECT_ACTION'
};

export const STREAMING_CONNECTED_ACTION = 'STREAMING_CONNECTED_ACTION';
export type ConnectedAction = {
    type: 'STREAMING_CONNECTED_ACTION'
};

export const STREAMING_DISCONNECT_ACTION = 'STREAMING_DISCONNECT_ACTION';
export type DisconnectAction = {
    type: 'STREAMING_DISCONNECT_ACTION'
};

export const STREAMING_DISCONNECTED_ACTION = 'STREAMING_DISCONNECTED_ACTION';
export type DisconnectedAction = {
    type: 'STREAMING_DISCONNECTED_ACTION'
};
