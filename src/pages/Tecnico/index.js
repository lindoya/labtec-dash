import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import DashTecnico from './DashTecnicoContainer'

class TecnicoRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/tecnico/dash' component={DashTecnico}/>  
        </Switch>
    )
  }
}


export default TecnicoRoute