import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import DashScreenControl from './DashControl'

class ScreenControlRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/screenControl/dash' component={DashScreenControl}/>  
        </Switch>
    )
  }
}


export default ScreenControlRoute