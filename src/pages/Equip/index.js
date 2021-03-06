import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NewEquip from './NewEquipContainer'
import NewType from './NewTypeContainer'
import DashEquip from './DashEquipContainer'

class CompanyRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/equip/add' component={NewEquip}/> 
          <Route exact path='/logged/equip/addType' component={NewType}/> 
          <Route exact path='/logged/equip/dash' component={DashEquip}/> 
        </Switch>
    )
  }
}


export default CompanyRoute