import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NewAnalise from './NewAnaliseContainer'

class AnaliseRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/analise/add' component={NewAnalise}/>  
        </Switch>
    )
  }
}


export default AnaliseRoute