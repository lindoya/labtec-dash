import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NewEntrance from './AddEntranceContainer'
// import DashEntrance from './DashEntranceContainer'

class EntranceRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/entrance/add' component={NewEntrance}/> 
          {/* <Route exact path='/logged/entrance/dash' component={DashEntrance}/>  */}
        </Switch>
    )
  }
}


export default EntranceRoute