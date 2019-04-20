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
            return (<a onClick={props.disconnectFromSignalR}>Disconnect</a>);
        case 'Disconnected':
            return (<a onClick={props.connectToSignalR}>Connect</a>);
        default:
            throw "unhandled connectivity state";
    }
}

const getConnectivityLogo = (props: TopBarStateProps) => {
    const logoClassName = `TopBar-logo-${props.appConnectivity}`;
    switch (props.appConnectivity) {
        case 'Connected':
            return (<img src={connectedLogo} className={logoClassName} />);
        case 'Connecting':
            return (<img src={connectingLogo} className={logoClassName} />);
        case 'Disconnected':
            return (<img src={disconnectedLogo} className={logoClassName} />);
        default:
            throw "unhandled connectivity state";
    }
    // switch (props.appConnectivity) {
    //     case 'Connected':
    //         return '#00FF99';
    //     case 'Connecting':
    //         return '#61DAFB';
    //     case 'Disconnected':
    //         return '#BB3333';
    //     default:
    //         throw "unhandled connectivity state";
    // };
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