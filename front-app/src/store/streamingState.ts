export interface StreamingState {
    infiniteSubscriptions: InfiniteSubscriptionsState[],
    limitedSubscriptions: LimitedSubscriptionsState[],
}

export interface InfiniteSubscriptionsState {
    productId: string,
};

export interface LimitedSubscriptionsState {
    productId: string,
};

export const initialStreamingState: StreamingState = {
    infiniteSubscriptions: [],
    limitedSubscriptions: [],
};