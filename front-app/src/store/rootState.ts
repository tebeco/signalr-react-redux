import { StreamingState, initialStreamingState } from "./connectivityState";
import { WorkspaceState, initialWorkspaceState } from "./workspaceState";

export interface RootState {
    streaming: StreamingState
    workspace: WorkspaceState
};

export const initialRootState: RootState = {
    streaming: initialStreamingState,
    workspace: initialWorkspaceState
}