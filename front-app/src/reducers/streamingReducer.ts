import { StreamingState, initialStreamingState } from "../store/rootState";
import { StreamingActions } from "./streamingActions";

export const streamingReducer = (state: StreamingState = initialStreamingState, action: StreamingActions) => {
    return state;
}

