import { ConnectivityAction } from "./connectivityActions";
import { ConnectivityState, initialStreamingState } from "../store/connectivityState";

export const streamingReducer = (state: ConnectivityState = initialStreamingState, action: ConnectivityAction): ConnectivityState => {
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

