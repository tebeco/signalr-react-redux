import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../store/rootState';
import { ConnectivityAction } from '../../reducers/connectivityActions';
import { SubscribeToProductAction } from '../../reducers/pricerActions';
import { SharedProductTileState } from '../../store/workspaceState';

interface PricerTileProps {
    pricerId: string,
    product: string,
    price: string,

    doSubscribe: () => SubscribeToProductAction,
}

interface OwnProps {
    id: string
}

const PricerTileComponent = (props: PricerTileProps) => (
    <div className="tile">
        Tile
        <p>
            id : '{props.pricerId}'<br />
            product : '{props.product}'<br />
            {props.price}
        </p>
        <p>
            <a onClick={props.doSubscribe}>Subscribe</a>
        </p>
    </div>
);

const doSubscribe = (): SubscribeToProductAction => ({
    type: 'STREAMING_SUBSCRIBE_TO_PRODUCT_ACTION',
    product: 'productId1',
})

const mapDispatchToProps = (dispatch: Dispatch<ConnectivityAction>) => bindActionCreators({ doSubscribe }, dispatch);

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
    const pricerState = state.workspace.tiles[ownProps.id] as SharedProductTileState;
    return {
        pricerId: pricerState.id,
        product: pricerState.productId,
        price: pricerState.price
    }
}

export const PricerTile = connect(mapStateToProps, mapDispatchToProps)(PricerTileComponent);
