import { StreamingAction } from "./streamingActions";
import { StreamingState, initialStreamingState } from "../store/connectivityState";

export const streamingReducer = (state: StreamingState = initialStreamingState, action: StreamingAction): StreamingState => {
    switch (action.type) {
        case 'STREAMING_CONNECT_ACTION':
            return {
                ...state,
                connectivity: 'Connecting'
            };
        case 'STREAMING_CONNECTED_ACTION':
            return {
                ...state,
                connectivity: 'Connected'
            };
        case 'STREAMING_DISCONNECT_ACTION':
            return {
                ...state,
                connectivity: 'Disconnected'
            };
        default:
            return state
    }
}

