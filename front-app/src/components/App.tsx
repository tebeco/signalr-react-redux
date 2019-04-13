import React from 'react';
import { connect } from 'react-redux';
import { TopBar } from './TopBar/TopBar';
import { Workspace } from './Workspace/Workspace';

const AppComponent = () => {
  return (
    <>
      <TopBar />
      <Workspace />
    </>
  );
}

export const App = connect()(AppComponent)