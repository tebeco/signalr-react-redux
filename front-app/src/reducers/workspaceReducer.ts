import { WorkspaceState, initialWorkspaceState } from '../store/rootState';
import { RootAction } from '../store/rootActions';

export const workspaceReducer = (state: WorkspaceState = initialWorkspaceState, action: RootAction): WorkspaceState => {
    switch (action.type) {
        default:
            return state
    }
}

