import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../store/rootState';
import { ConnectivityAction } from '../../reducers/connectivityActions';
import { SubscribeToSharedProductAction, subscribeToSharedProductAction } from '../../reducers/pricerActions';
import { SharedProductTileState } from '../../store/workspaceState';
import { StreamingConnectivityState } from '../../store/connectivityState';

interface PricerTileProps {
    pricerId: string,
    productId: string,
    price: string,
    connectivity: StreamingConnectivityState,

    doSubscribe: (productId: string) => SubscribeToSharedProductAction,
}

interface OwnProps {
    id: string,
}

const PricerTileComponent = (props: PricerTileProps) => (
    <div className="tile">
        Tile
        <p>
            id : '{props.pricerId}'<br />
            product id : '{props.productId}'<br />
            {props.price}
        </p>
        {
            props.connectivity === "Connected" &&
            <p>
                <a onClick={() => props.doSubscribe(props.productId)}>Subscribe</a>
            </p>
        }
    </div>
);

const mapDispatchToProps = (dispatch: Dispatch<ConnectivityAction>) => bindActionCreators({ doSubscribe: subscribeToSharedProductAction }, dispatch);

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
    const pricerState = state.workspace.tiles[ownProps.id] as SharedProductTileState;
    if (state.streaming.connectivity != "Connected") {pricerState.price = '-';}
    return {
        pricerId: pricerState.id,
        productId: pricerState.productId,
        price: pricerState.price,
        connectivity: state.streaming.connectivity,
    }
}

export const PricerTile = connect(mapStateToProps, mapDispatchToProps)(PricerTileComponent);
