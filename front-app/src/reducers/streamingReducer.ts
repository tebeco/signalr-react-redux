import { ConnectivityAction } from "./connectivityActions";
import { StreamingState, initialStreamingState } from "../store/connectivityState";

export const streamingReducer = (state: StreamingState = initialStreamingState, action: ConnectivityAction): StreamingState => {
    switch (action.type) {
        case 'SIGNALR_CONNECT_ACTION':
            return {
                ...state,
                connectivity: 'Connecting'
            };
        case 'SIGNALR_CONNECTED_ACTION':
            return {
                ...state,
                connectivity: 'Connected'
            };
        case 'SIGNALR_DISCONNECT_ACTION':
            return {
                ...state,
                connectivity: 'Disconnected'
            };
        default:
            return state
    }
}

