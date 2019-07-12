import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NewAcessorio from './NewAcessorio'

class AcessoriosRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/acessories/add' component={NewAcessorio}/>  
        </Switch>
    )
  }
}


export default AcessoriosRoute