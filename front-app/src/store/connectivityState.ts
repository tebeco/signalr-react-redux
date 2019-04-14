export type ConnectedState = 'Connected';
export type ConnectingState = 'Connecting';
export type DisconnectedState = 'Disconnected';

export type ConnectivityStateType =
    | ConnectedState
    | ConnectingState
    | DisconnectedState;

export interface ConnectivityState {
    connectivity: ConnectivityStateType
};

export const initialConnectivityState: ConnectivityState = {
    connectivity: 'Disconnected'
};