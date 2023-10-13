import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './src/views/Login';
import Home from './src/views/Home';
import Task from './src/views/Task';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login
    // ,
    // Home,
    // Task
  })
)

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Routes />
    </>
  );
}
