import React from 'react';
import { connect } from "react-redux";
import './Tile.css'
import { RootState } from '../../store/rootState';
import { ErrorTile } from '../ErrorTile/ErrorTile';
import { TileState } from '../../store/workspaceState';
import { InfinteProductTile } from '../InfinteProductTile/InfinteProductTile';
import { LimitedProductTile } from '../LimitedProductTile/LimitedProductTile';

interface TileProps {
    tileId: string
    tileState: TileState
}

// Better use React Context, in order to avoid "OwnProps" being passed to every children
// aka : Props Drilling is bad
export interface TileOwnProps {
    tileId: string,
}

const TileComponent = (props: TileProps) => {
    switch (props.tileState.type) {
        case 'INFINITE_PRODUCT_STATE':
            return (<InfinteProductTile tileId={props.tileId} />);
        case 'LIMITED_PRODUCT_STATE':
                return (<LimitedProductTile tileId={props.tileId} />);
        default:
            return (<ErrorTile />);
    }
};

const mapStateToProps = (state: RootState, tileOwnProps: TileOwnProps): TileProps => {
    return {
        tileId: tileOwnProps.tileId,
        tileState: state.workspace.tiles[tileOwnProps.tileId]
    }
}

export const Tile = connect(mapStateToProps)(TileComponent);
