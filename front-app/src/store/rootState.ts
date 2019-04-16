import { ConnectivityState, initialStreamingState } from "./connectivityState";
import { WorkspaceState, initialWorkspaceState } from "./workspaceState";

export interface RootState {
    streaming: ConnectivityState
    workspace: WorkspaceState
};

export const initialRootState: RootState = {
    streaming: initialStreamingState,
    workspace: initialWorkspaceState
}