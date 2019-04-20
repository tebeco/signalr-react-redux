import { ConnectivityState, initialConnectivityState } from "./connectivityState";
import { WorkspaceState, initialWorkspaceState } from "./workspaceState";
import { StreamingState, initialStreamingState } from "./streamingState";

export interface RootState {
    connectivity: ConnectivityState,
    workspace: WorkspaceState,
    streaming: StreamingState
};

export const initialRootState: RootState = {
    connectivity: initialConnectivityState,
    workspace: initialWorkspaceState,
    streaming: initialStreamingState,
}