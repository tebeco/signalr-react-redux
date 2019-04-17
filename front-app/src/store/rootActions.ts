import { ConnectivityAction } from "../reducers/connectivityActions";
import { ProductAction } from "../reducers/pricerActions";

export type RootAction =
    | ConnectivityAction
    | ProductAction
    ;