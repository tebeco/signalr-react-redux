import { StreamingAction } from "../reducers/streamingActions";
import { PricerAction } from "../reducers/pricerActions";

export type RootAction =
    | StreamingAction
    | PricerAction
    ;