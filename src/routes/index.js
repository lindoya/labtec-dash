import React from "react";
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

import PrivateRoute from './privateRoutes'

import LoginPage from '../pages/Login'

const Routes = () => (

  <HashRouter>
    <Switch>
      <Route exact path='/login' component={LoginPage} />
      <PrivateRoute path='/logged' />
      <Redirect to='/login' />
    </Switch>
  </HashRouter>
)

export default Routes