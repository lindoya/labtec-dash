import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import uuidValidate from 'uuid-validate'

import Sider from '../components/SideBar'

import PagesRoute from '../pages'
import './index.css'

class PrivateRoute extends Component {

  render() {
    if (uuidValidate(this.props.auth.token)) {
      return (
        <div>
          <div className='div-sideBar'>
            <Sider />
          </div>
          <div className='div-body'>
            <Switch>
              <Route path='/logged' component={PagesRoute} />
            </Switch>
          </div>
        </div>
      )
    } else {
      return <Redirect to='/login' />
      // return <Redirect to={{ pathname:'/login', state: { from: this.props.location} }}/>
    }
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
  }
}

export default connect (mapStateToProps)(PrivateRoute)