export type StreamingActions = 
    ConnectAction |
    DisconnectAction;

export type CONNECT_ACTION = 'STREAMING_CONNECT';
export type ConnectAction = {
    type: CONNECT_ACTION
};

export type DISCONNECT_ACTION = 'STREAMING_DISCONNECT'; 
export type DisconnectAction = {
    type: DISCONNECT_ACTION
};
