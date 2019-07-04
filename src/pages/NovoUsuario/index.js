import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NewUser from './NewUser'

class NewUserRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/user/add' component={NewUser}/>  
        </Switch>
    )
  }
}


export default NewUserRoute