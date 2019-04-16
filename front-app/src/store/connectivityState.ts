export type StreamingConnectedState = 'Connected';
export type StreamingConnectingState = 'Connecting';
export type StreamingDisconnectedState = 'Disconnected';

export type StreamingConnectivityState =
    | StreamingConnectedState
    | StreamingConnectingState
    | StreamingDisconnectedState;

export interface StreamingState {
    connectivity: StreamingConnectivityState
};

export const initialStreamingState: StreamingState = {
    connectivity: 'Disconnected'
};