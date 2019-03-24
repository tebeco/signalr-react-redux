export type StreamingConnectedState = 'Connected';
export type StreamingConnectingState = 'Connecting';
export type StreamingDisconnectedState = 'Disconnected';

export type StreamingConnectivityState =
    StreamingConnectedState |
    StreamingConnectingState |
    StreamingDisconnectedState;

export type StreamingState = {
    connectivity: StreamingConnectivityState
};

export type RootState = {
    streaming: StreamingState
};

export const initialStreamingState: StreamingState = {
    connectivity: 'Disconnected'
};

export const initialRootState: RootState = {
    streaming: initialStreamingState
}