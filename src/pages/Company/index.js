import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NewCompany from './NewCompanyContainer'
import DashContainer from './DashCompanyContainer'

class CompanyRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/company/add' component={NewCompany}/> 
          <Route exact path='/logged/company/dash' component={DashContainer}/> 
        </Switch>
    )
  }
}


export default CompanyRoute