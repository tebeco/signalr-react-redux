import React from 'react';
import { connect } from "react-redux";
import './Workspace.css'
import { RootState } from '../../store/rootState';
import { Tile } from '../Tile/Tile';

type WorkspaceProps = {
    tileIds: string[]
}

const WorkspaceComponent = (props: WorkspaceProps) => {
    return (
        <div className="workspace">
            {props.tileIds.map(id => (<Tile key={id} tileId={id} />))}
        </div>
    )
}

const mapStateToProps = (state: RootState): WorkspaceProps => ({
    tileIds: Object.keys(state.workspace.tiles)
});

export const Workspace = connect(mapStateToProps)(WorkspaceComponent)