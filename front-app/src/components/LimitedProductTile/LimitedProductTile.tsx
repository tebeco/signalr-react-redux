import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../store/rootState';
import { ConnectivityAction } from '../../reducers/connectivityActions';
import { SubscribeToLimitedProductAction, subscribeToLimitedProductAction } from '../../reducers/pricerActions';
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
        Tile
        <p>
            id : '{props.tileId}'<br />
            product id : '{props.productId}'<br />
            {props.price}
        </p>
        {
            props.connectivity === "Connected" &&
            <p>
                <a onClick={() => props.subscribeToLimitedProductAction(props.productId)}>Subscribe</a>
            </p>
        }
    </div>
);

const mapDispatchToProps = (dispatch: Dispatch<ConnectivityAction>): LimitedProductTileDispatchProps => bindActionCreators({ subscribeToLimitedProductAction }, dispatch);

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
