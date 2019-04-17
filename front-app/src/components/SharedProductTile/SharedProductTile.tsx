import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../store/rootState';
import { ConnectivityAction } from '../../reducers/connectivityActions';
import { SubscribeToSharedProductAction, subscribeToSharedProductAction } from '../../reducers/pricerActions';
import { SharedProductTileState } from '../../store/workspaceState';
import { StreamingConnectivityState } from '../../store/connectivityState';
import { TileOwnProps } from '../Tile/Tile';

interface SharedProductTileProps {
    tileId: string,
    productId: string,
    price: string,
    connectivity: StreamingConnectivityState,

    doSubscribe: (productId: string) => SubscribeToSharedProductAction,
}

const SharedProductTileComponent = (props: SharedProductTileProps) => (
    <div className="tile">
        Tile
        <p>
            id : '{props.tileId}'<br />
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

const mapStateToProps = (state: RootState, ownProps: TileOwnProps) : SharedProductTileProps => {
    const sharedProductState = state.workspace.tiles[ownProps.tileId] as SharedProductTileState;

    // TODO : This should be in a reducer
    if (state.streaming.connectivity != "Connected") {sharedProductState.price = '-';}

    return ({
        tileId: sharedProductState.tileId,
        productId: sharedProductState.productId,
        price: sharedProductState.price,
        connectivity: state.streaming.connectivity,
    }) as SharedProductTileProps;
}

export const SharedProductTile = connect(mapStateToProps, mapDispatchToProps)(SharedProductTileComponent);
