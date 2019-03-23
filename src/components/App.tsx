import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { stat } from 'fs';
import { RootState, StreamingConnectivityState } from '../store/rootState';

type AppProps = {
  appConnectivity: StreamingConnectivityState;
};

const mapStateToProps = (state: RootState): AppProps => ({
  appConnectivity: state.streaming.connectivity
});

const connectButton = <button>Connect</button>
const disconnectButton = <button>Disconnect</button>
const noConnectivityButton = <></>

const getConnectivityButton = (appConnectivity: StreamingConnectivityState): JSX.Element => {
  switch (appConnectivity) {
    case 'Connected':
    case 'Connecting':
      return disconnectButton;
    case 'Disconnected':
      return connectButton;
    case 'Disconnecting':
      return noConnectivityButton;
    default:
      throw "unhandled connectivity state";
  }
}

const AppComponent = (props: AppProps) => {
  const changeConnectivitybutton = getConnectivityButton(props.appConnectivity);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Current connectivity : <code>{props.appConnectivity}</code>.
        </p>
        {changeConnectivitybutton}
      </header>
    </div>
  );
}

export const App = connect(mapStateToProps)(AppComponent)