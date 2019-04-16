import { ConnectivityAction } from "../reducers/connectivityActions";
import { PricerAction } from "../reducers/pricerActions";

export type RootAction =
    | ConnectivityAction
    | PricerAction
    ;