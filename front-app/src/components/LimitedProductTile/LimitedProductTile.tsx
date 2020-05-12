import React from 'react'
import '../Tile/Tile.css'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../store/rootState';
import { ConnectivityAction } from '../../reducers/connectivityActions';
import { SubscribeToLimitedProductAction, subscribeToLimitedProduct } from '../../reducers/pricerActions';
import { LimitedProductTileState } from '../../store/workspaceState';
import { ConnectivityStateType } from '../../store/connectivityState';
import { TileOwnProps } from '../Tile/Tile';

interface LimitedProductTileStateProps {
    tileId: string,
    productId: string,
    price: string,
    connectivity: ConnectivityStateType,
}

interface LimitedProductTileDispatchProps {
    subscribeToLimitedProductAction: (productId: string) => SubscribeToLimitedProductAction,
}

const LimitedProductTileComponent = (props: LimitedProductTileStateProps & LimitedProductTileDispatchProps) => (
    <div className="tile">
        <p className="productName">{props.productId}</p>
        <div className="productPrice">{props.price}</div>

        {
            props.connectivity === "Connected" &&
            <p>
                <button onClick={() => props.subscribeToLimitedProductAction(props.productId)} >Subscribe</button>
            </p>
        }
    </div>
);

const mapDispatchToProps = (dispatch: Dispatch<ConnectivityAction>): LimitedProductTileDispatchProps => bindActionCreators({ subscribeToLimitedProductAction: subscribeToLimitedProduct }, dispatch);

const mapStateToProps = (state: RootState, ownProps: TileOwnProps): LimitedProductTileStateProps => {
    const limitedProductState = state.workspace.tiles[ownProps.tileId] as LimitedProductTileState;

    return {
        tileId: limitedProductState.tileId,
        productId: limitedProductState.productId,
        price: limitedProductState.price,
        connectivity: state.connectivity.connectivity,
    }
}

export const LimitedProductTile = connect(mapStateToProps, mapDispatchToProps)(LimitedProductTileComponent);
