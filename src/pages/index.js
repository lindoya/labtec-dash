import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import uuidValidate from 'uuid-validate'
import Dash from "./Dash";

import CompanyRoute from './Company'


class PagesRoute extends Component {

  render() {

    if (uuidValidate(this.props.auth.token)){
      return (
          <Switch>
          <Route exact path='/logged/dash' component={Dash}/>
          <Route path='/logged/company' component={CompanyRoute}/>
          </Switch>
        ) 
    }else{
      return <Redirect to='/login' />
    }
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
  }
}

export default connect (mapStateToProps)(PagesRoute)