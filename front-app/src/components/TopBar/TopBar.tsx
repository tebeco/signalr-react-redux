import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import './TopBar.css'
import connectingLogo from './logos/connecting-logo.svg';
import connectedLogo from './logos/connected-logo.svg';
import disconnectedLogo from './logos/disconnected-logo.svg';
import { RootState } from "../../store/rootState";
import { ConnectAction, ConnectivityAction, DisconnectAction, connectToSignalR, disconnectFromSignalR } from '../../reducers/connectivityActions';
import { ConnectivityStateType } from '../../store/connectivityState';

const getConnectivityButton = (props: TopBarStateProps & TopBarDispacthProps): JSX.Element => {
    switch (props.appConnectivity) {
        case 'Connected':
        case 'Connecting':
            return (<button onClick={props.disconnectFromSignalR} >Disconnect</button>);
        case 'Disconnected':
            return (<button onClick={props.connectToSignalR} >Connect</button>);
        default:
            throw new Error("unhandled connectivity state");
    }
}

const getConnectivityLogo = (props: TopBarStateProps) => {
    const logoClassName = `TopBar-logo-${props.appConnectivity}`;
    switch (props.appConnectivity) {
        case 'Connected':
            return (<img src={connectedLogo} className={logoClassName} alt="connected" />);
        case 'Connecting':
            return (<img src={connectingLogo} className={logoClassName} alt="connecting" />);
        case 'Disconnected':
            return (<img src={disconnectedLogo} className={logoClassName} alt="disconnected" />);
        default:
            throw new Error("unhandled connectivity state");
    }
};

const TopBarComponent = (props: TopBarStateProps & TopBarDispacthProps) => {
    return (
        <div className="TopBar">
            <ul>
                <li>{getConnectivityLogo(props)}</li>
                <li className="padding-li"><div>{getConnectivityButton(props)}</div></li>
            </ul>
        </div>
    );
};

interface TopBarStateProps {
    appConnectivity: ConnectivityStateType;
}

interface TopBarDispacthProps {
    connectToSignalR: () => ConnectAction;
    disconnectFromSignalR: () => DisconnectAction;
};


const mapStateToProps = (state: RootState): TopBarStateProps => ({
    appConnectivity: state.connectivity.connectivity,
});

const mapDispatchToProps = (dispatch: Dispatch<ConnectivityAction>) => bindActionCreators({ connectToSignalR, disconnectFromSignalR }, dispatch);


export const TopBar = connect(mapStateToProps, mapDispatchToProps)(TopBarComponent);