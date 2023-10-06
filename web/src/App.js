import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import SessionStore from './utils/SessionStore';

import Home from './views/Home';
import Task from './views/Task';
import Login from './views/Login';
import Register from './views/Register';
import Loading from './components/Loading';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    SessionStore.getData()
      .then(response => {
        if (response.token) {
          setIsConnected(true);
        }
        setIsLoading(false);
      });

  }, [isConnected, isLoading]);

  return (
    !isLoading ?
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                isConnected ?
                  <Redirect to="/home" />
                  :
                  <Redirect to="/login" />
              )
            }}
          />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/task" exact component={Task} />
          <Route path="/task/:id" exact component={Task} />
        </Switch>
      </BrowserRouter>
      :
      <Loading />
  );
}
