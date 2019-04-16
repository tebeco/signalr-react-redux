import React from 'react';
import { connect } from "react-redux";
import './Tile.css'
import { RootState } from '../../store/rootState';
import { PricerTile } from '../PricerTile/PricerTile';
import { ErrorTile } from '../ErrorTile/ErrorTile';
import { TileState, SHARED_PRODUCT_STATE } from '../../store/workspaceState';


interface TileProps {
    id: string
    tileState: TileState
}

interface OwnProps {
    id: string
}

const TileComponent = (props: TileProps) => {
    if(props.tileState.type === SHARED_PRODUCT_STATE) {
        return (<PricerTile id={props.id} />);
    }
    else {
        return (<ErrorTile />);
    }
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): TileProps => {
    return { 
        id: ownProps.id,
        tileState: state.workspace.tiles[ownProps.id]
     }
}

export const Tile = connect(mapStateToProps)(TileComponent);
