import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { RootState, StreamingConnectivityState } from '../store/rootState';
import { TopBar } from './TopBar/TopBar';
import { StreamingActions, ConnectAction, ConnectedAction, DisconnectAction } from '../reducers/streamingActions';
import { bindActionCreators, Dispatch } from 'redux';

type AppProps = {
  appConnectivity: StreamingConnectivityState;
  doConnecting: () => ConnectAction;
  doConnected: () => ConnectedAction;
  doDisconnect: () => DisconnectAction;
};

const mapStateToProps = (state: RootState) => ({
  appConnectivity: state.streaming.connectivity
});

const doConnecting = (): ConnectAction => ({
  type: 'STREAMING_CONNECT_ACTION'
});

const doConnected = (): ConnectedAction => ({
  type: 'STREAMING_CONNECTED_ACTION'
});
const doDisconnect = (): DisconnectAction => ({
  type: 'STREAMING_DISCONNECT_ACTION'
});

const mapDispatchToProps = (dispatch: Dispatch<StreamingActions>) => {
  return {
      dispatch,
      ...bindActionCreators({ doConnecting, doConnected, doDisconnect }, dispatch)
  };
};

const AppComponent = (props: AppProps) => {
  return (
    <>
      <TopBar />
      <div className="App">
        <header className="App-header">
          <p>
            Current connectivity : <code>{props.appConnectivity}</code>.
          </p>
          <div><button onClick={props.doConnecting}>DEBUG : Set state to Connecting</button></div>
          <div><button onClick={props.doConnected}>DEBUG : Set state to Connected</button></div>
          <div><button onClick={props.doDisconnect}>DEBUG : Set state to Disconnected</button></div>

        </header>
      </div>
    </>
  );
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent)