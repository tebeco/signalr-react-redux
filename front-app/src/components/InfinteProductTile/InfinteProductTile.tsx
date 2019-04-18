import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../store/rootState';
import { ConnectivityAction } from '../../reducers/connectivityActions';
import { SubscribeToInfiniteProductAction, subscribeToInfiniteProductAction } from '../../reducers/pricerActions';
import { InfinteProductTileState } from '../../store/workspaceState';
import { StreamingConnectivityState } from '../../store/connectivityState';
import { TileOwnProps } from '../Tile/Tile';

interface InfinteProductTileProps {
    tileId: string,
    productId: string,
    price: string,
    connectivity: StreamingConnectivityState,

    doSubscribe: (productId: string) => SubscribeToInfiniteProductAction,
}

const InfinteProductTileComponent = (props: InfinteProductTileProps) => (
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

const mapDispatchToProps = (dispatch: Dispatch<ConnectivityAction>) => bindActionCreators({ doSubscribe: subscribeToInfiniteProductAction }, dispatch);

const mapStateToProps = (state: RootState, ownProps: TileOwnProps) : InfinteProductTileProps => {
    const limitedProductState = state.workspace.tiles[ownProps.tileId] as InfinteProductTileState;

    return ({
        tileId: limitedProductState.tileId,
        productId: limitedProductState.productId,
        price: limitedProductState.price,
        connectivity: state.streaming.connectivity,
    }) as InfinteProductTileProps;
}

export const InfinteProductTile = connect(mapStateToProps, mapDispatchToProps)(InfinteProductTileComponent);
