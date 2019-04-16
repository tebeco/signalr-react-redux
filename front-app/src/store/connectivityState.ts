export type ConnectedState = 'Connected';
export type ConnectingState = 'Connecting';
export type DisconnectedState = 'Disconnected';

export type StreamingConnectivityState =
    | ConnectedState
    | ConnectingState
    | DisconnectedState;

export interface ConnectivityState {
    connectivity: StreamingConnectivityState
};

export const initialStreamingState: ConnectivityState = {
    connectivity: 'Disconnected'
};