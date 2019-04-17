import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../store/rootState';
import { ConnectivityAction } from '../../reducers/connectivityActions';
import { SubscribeToUniqueProductAction, subscribeToUniqueProductAction } from '../../reducers/pricerActions';
import { UniqueProductTileState } from '../../store/workspaceState';
import { StreamingConnectivityState } from '../../store/connectivityState';
import { TileOwnProps } from '../Tile/Tile';

interface UniqueProductTileProps {
    tileId: string,
    productId: string,
    price: string,
    connectivity: StreamingConnectivityState,

    doSubscribe: (productId: string) => SubscribeToUniqueProductAction,
}

const UniqueProductTileComponent = (props: UniqueProductTileProps) => (
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
                <a onClick={() => props.doSubscribe(props.productId)}>Subscribe</a>
            </p>
        }
    </div>
);

const mapDispatchToProps = (dispatch: Dispatch<ConnectivityAction>) => bindActionCreators({ doSubscribe: subscribeToUniqueProductAction }, dispatch);

const mapStateToProps = (state: RootState, ownProps: TileOwnProps) : UniqueProductTileProps => {
    const unqiueProductState = state.workspace.tiles[ownProps.tileId] as UniqueProductTileState;
    
    // TODO : This should be in a reducer
    if (state.streaming.connectivity != "Connected") {unqiueProductState.price = '-';}

    return {
        tileId: unqiueProductState.tileId,
        productId: unqiueProductState.productId,
        price: unqiueProductState.price,
        connectivity: state.streaming.connectivity,
    } as UniqueProductTileProps
}

export const UniqueProductTile = connect(mapStateToProps, mapDispatchToProps)(UniqueProductTileComponent);
