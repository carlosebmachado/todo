import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../views/Home';
import Task from '../views/Task';
import Sync from '../views/Sync';


function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/task" exact component={Task} />
        <Route path="/task/:id" exact component={Task} />
        <Route path="/sync" exact component={Sync} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
