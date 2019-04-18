import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../store/rootState';
import { ConnectivityAction } from '../../reducers/connectivityActions';
import { SubscribeToInfiniteProductAction, subscribeToInfiniteProductAction } from '../../reducers/pricerActions';
import { InfinteProductTileState } from '../../store/workspaceState';
import { StreamingConnectivityState } from '../../store/connectivityState';
import { TileOwnProps } from '../Tile/Tile';

interface InfinteProductTileStateProps {
    tileId: string,
    productId: string,
    price: string,
    connectivity: StreamingConnectivityState,
}

interface InfinteProductTileDispatchProps {
    subscribeToInfiniteProductAction: (productId: string) => SubscribeToInfiniteProductAction,
}

const InfinteProductTileComponent = (props: InfinteProductTileStateProps & InfinteProductTileDispatchProps) => (
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
                <a onClick={() => props.subscribeToInfiniteProductAction(props.productId)}>Subscribe</a>
            </p>
        }
    </div>
);

const mapDispatchToProps = (dispatch: Dispatch<ConnectivityAction>) => bindActionCreators({ subscribeToInfiniteProductAction }, dispatch);

const mapStateToProps = (state: RootState, ownProps: TileOwnProps) : InfinteProductTileStateProps => {
    const limitedProductState = state.workspace.tiles[ownProps.tileId] as InfinteProductTileState;

    return {
        tileId: limitedProductState.tileId,
        productId: limitedProductState.productId,
        price: limitedProductState.price,
        connectivity: state.streaming.connectivity,
    };
}

export const InfinteProductTile = connect(mapStateToProps, mapDispatchToProps)(InfinteProductTileComponent);
