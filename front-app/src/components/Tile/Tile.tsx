import React from 'react';
import { connect } from "react-redux";
import './Tile.css'
import { RootState } from '../../store/rootState';
import { PricerTile } from '../PricerTile/PricerTile';
import { ErrorTile } from '../ErrorTile/ErrorTile';


interface TileProps {
    id: string
}

interface OwnProps {
    id: string
}

const TileComponent = (props: TileProps) => {
    return (<PricerTile id={props.id} />);
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): TileProps => {
    return { id: ownProps.id }
}

export const Tile = connect(mapStateToProps)(TileComponent);
