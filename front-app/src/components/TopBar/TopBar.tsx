import React from 'react';
import './TopBar.css'
import connectingLogo from './connecting-logo.svg';
import connectedLogo from './connected-logo.svg';
import disconnectedLogo from './disconnected-logo.svg';
import { connect } from "react-redux";
import { StreamingConnectivityState, RootState } from "../../store/rootState";

type TopBarProps = {
    appConnectivity: StreamingConnectivityState;
};

const getConnectivityLogo = (props: TopBarProps): JSX.Element => {
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
}

const mapStateToProps = (state: RootState): TopBarProps => ({
    appConnectivity: state.streaming.connectivity
});

// const changeConnectivitybutton = getConnectivityButton(props.appConnectivity);
const TopBarComponent = (props: TopBarProps) => {
    return (
        <div className="TopBar">
            <ul>
                <li>{getConnectivityLogo(props)}</li>
                <li><div>{props.appConnectivity}</div></li>
            </ul>
        </div>
    );
};

export const TopBar = connect(mapStateToProps)(TopBarComponent);