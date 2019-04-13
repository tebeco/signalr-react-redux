import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store/rootState';

interface PricerTileProps {
    pricerId: string,
    product: string
}

interface OwnProps {
    id: string
}

const PricerTileComponent = (props: PricerTileProps) => (
    <div className="tile">
        Tile
        <p>
            id : '{props.pricerId}'<br />
            product : '{props.product}'
        </p>
    </div>
);

const mapStateToProps = (state: RootState, ownProps: OwnProps): PricerTileProps => {
    let pricerState = state.workspace.tiles.byId[ownProps.id];
    return {
        pricerId: pricerState.id,
        product: pricerState.product
    }
}

export const PricerTile = connect(mapStateToProps)(PricerTileComponent);
