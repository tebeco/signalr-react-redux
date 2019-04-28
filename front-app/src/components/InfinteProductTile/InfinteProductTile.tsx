import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import '../Tile/Tile.css'
import { RootState } from '../../store/rootState';
import { ConnectivityAction } from '../../reducers/connectivityActions';
import { SubscribeToInfiniteProductAction, subscribeToInfiniteProduct } from '../../reducers/pricerActions';
import { InfinteProductTileState } from '../../store/workspaceState';
import { ConnectivityStateType } from '../../store/connectivityState';
import { TileOwnProps } from '../Tile/Tile';

interface InfinteProductTileStateProps {
    tileId: string,
    productId: string,
    price: string,
    connectivity: ConnectivityStateType,
}

interface InfinteProductTileDispatchProps {
    subscribeToInfiniteProductAction: (productId: string) => SubscribeToInfiniteProductAction,
}

const InfinteProductTileComponent = (props: InfinteProductTileStateProps & InfinteProductTileDispatchProps) => (
    <div className="tile">
        <p className="productName">{props.productId}</p>
        <div className="productPrice">{props.price}</div>
    </div>
);

const mapDispatchToProps = (dispatch: Dispatch<ConnectivityAction>) => bindActionCreators({ subscribeToInfiniteProductAction: subscribeToInfiniteProduct }, dispatch);

const mapStateToProps = (state: RootState, ownProps: TileOwnProps) : InfinteProductTileStateProps => {
    const limitedProductState = state.workspace.tiles[ownProps.tileId] as InfinteProductTileState;

    return {
        tileId: limitedProductState.tileId,
        productId: limitedProductState.productId,
        price: limitedProductState.price,
        connectivity: state.connectivity.connectivity,
    };
}

export const InfinteProductTile = connect(mapStateToProps, mapDispatchToProps)(InfinteProductTileComponent);
