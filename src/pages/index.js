import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import uuidValidate from 'uuid-validate'


class PagesRoute extends Component {

  render() {

    if (uuidValidate(this.props.auth.token)){
      return (
        <div>
          <Switch>
            
          </Switch>
          
        </div>
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