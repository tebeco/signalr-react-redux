import { StreamingState, initialStreamingState } from "../store/streamingState";
import { ProductAction } from "./pricerActions";

export const streamingReducer = (state: StreamingState = initialStreamingState, action: ProductAction): StreamingState => {
    switch (action.type) {
        case 'SUBSCRIBED_TO_INFINITE_PRODUCT_ACTION':
            return {
                ...state,
                infiniteSubscriptions: [
                    ...state.infiniteSubscriptions,
                    { productId: action.productId }
                ]
            };
        case 'UNSUBSCRIBED_TO_INFINITE_PRODUCT_ACTION':
            return {
                ...state,
                infiniteSubscriptions: [
                    ...state.infiniteSubscriptions.filter(sub => sub.productId !== action.productId)
                ]
            };
        case 'SUBSCRIBED_TO_LIMITED_PRODUCT_ACTION':
            return {
                ...state,
                limitedSubscriptions: [
                    ...state.limitedSubscriptions,
                    { productId: action.productId }
                ]
            };
        case 'UNSUBSCRIBED_TO_LIMITED_PRODUCT_ACTION':
            return {
                ...state,
                limitedSubscriptions: [
                    ...state.limitedSubscriptions.filter(sub => sub.productId !== action.productId)
                ]
            };
        default:
            return state;
    }
}

