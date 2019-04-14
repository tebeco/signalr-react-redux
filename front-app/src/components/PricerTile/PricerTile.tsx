import React from 'react'
import { connect } from 'react-redux'
import { RootState, SharedProductTileState } from '../../store/rootState';
import { StreamingAction, SubscribeToProductAction } from '../../reducers/streamingActions';
import { bindActionCreators, Dispatch } from 'redux';

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

const mapDispatchToProps = (dispatch: Dispatch<StreamingAction>) => bindActionCreators({ doSubscribe }, dispatch);

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
    const pricerState = state.workspace.tiles[ownProps.id] as SharedProductTileState;
    return {
        pricerId: pricerState.id,
        product: pricerState.product,
        price: pricerState.price
    }
}

export const PricerTile = connect(mapStateToProps, mapDispatchToProps)(PricerTileComponent);
