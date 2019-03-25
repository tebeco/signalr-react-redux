export type StreamingActions = 
    ConnectAction |
    ConnectedAction |
    DisconnectAction;

export type STREAMING_CONNECT_ACTION = 'STREAMING_CONNECT_ACTION';
export type ConnectAction = {
    type: STREAMING_CONNECT_ACTION
};

export type STREAMING_CONNECTED_ACTION = 'STREAMING_CONNECTED_ACTION'; 
export type ConnectedAction = {
    type: STREAMING_CONNECTED_ACTION
};

export type STREAMING_DISCONNECT_ACTION = 'STREAMING_DISCONNECT_ACTION'; 
export type DisconnectAction = {
    type: STREAMING_DISCONNECT_ACTION
};
