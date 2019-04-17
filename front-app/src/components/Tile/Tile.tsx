import React from 'react';
import { connect } from "react-redux";
import './Tile.css'
import { RootState } from '../../store/rootState';
import { ErrorTile } from '../ErrorTile/ErrorTile';
import { TileState } from '../../store/workspaceState';
import { SharedProductTile } from '../SharedProductTile/SharedProductTile';
import { UniqueProductTile } from '../UniqueProductTile/UniqueProductTile';

interface TileProps {
    tileId: string
    tileState: TileState
}

export interface TileOwnProps {
    tileId: string,
}

const TileComponent = (props: TileProps) => {
    switch (props.tileState.type) {
        case 'SHARED_PRODUCT_STATE':
            return (<SharedProductTile tileId={props.tileId} />);
        case 'UNIQUE_PRODUCT_STATE':
                return (<UniqueProductTile tileId={props.tileId} />);
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
