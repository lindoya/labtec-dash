import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import DashTypeAccount from './DashTypeAccountContainer'

class TypeAccountRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/typeAccount/dash' component={DashTypeAccount}/>  
        </Switch>
    )
  }
}


export default TypeAccountRoute