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

export interface TileState {
    id: string;
    product: string;
}
export interface WorkspaceState {
    tiles: {
        byId: { [id: string]: TileState }
        allIds: string[]
    }
}

export interface RootState {
    streaming: StreamingState
    workspace: WorkspaceState
};

export const initialStreamingState: StreamingState = {
    connectivity: 'Disconnected'
};

export const initialWorkspaceState = {
    tiles: {
        byId: {
            '1': { id: '1', product: 'product 1' },
            '2': { id: '2', product: 'product 2' },
            '3': { id: '3', product: 'product 3' },
            '4': { id: '4', product: 'product 4' },
            '5': { id: '5', product: 'product 5' },
            '6': { id: '6', product: 'product 6' },
            '7': { id: '7', product: 'product 7' },
            '8': { id: '8', product: 'product 8' },
        },
        allIds: ['1', '2', '3', '4', '5', '6', '7', '8']
    }
};

export const initialRootState: RootState = {
    streaming: initialStreamingState,
    workspace: initialWorkspaceState
}