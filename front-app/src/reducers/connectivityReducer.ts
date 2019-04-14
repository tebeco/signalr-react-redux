import { ConnectivityAction } from "./connectivityActions";
import { ConnectivityState, initialConnectivityState } from "../store/connectivityState";

export const connectivityReducer = (state: ConnectivityState = initialConnectivityState, action: ConnectivityAction): ConnectivityState => {
    switch (action.type) {
        case 'SIGNALR_CONNECT_ACTION':
            return {
                ...state,
                connectivity: 'Connecting'
            };
        case 'SIGNALR_ON_CONNECTED_ACTION':
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

