import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NewPeca from './NewPeca'
import DashPeca from './DashPeca'

class PecaRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/peca/add' component={NewPeca}/> 
          <Route exact path='/logged/peca/dash' component={DashPeca}/> 
        </Switch>
    )
  }
}


export default PecaRoute