import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { RootState, StreamingConnectivityState } from '../store/rootState';
import { TopBar } from './TopBar/TopBar';

type AppProps = {
  appConnectivity: StreamingConnectivityState;
};

const mapStateToProps = (state: RootState) => ({
  appConnectivity: state.streaming.connectivity
});

const AppComponent = (props: AppProps) => {
  return (
    <>
      <TopBar />
      <div className="App">
        <header className="App-header">
          <p>
            Current connectivity : <code>{props.appConnectivity}</code>.
          </p>
        </header>
      </div>
    </>
  );
}

export const App = connect(mapStateToProps)(AppComponent)