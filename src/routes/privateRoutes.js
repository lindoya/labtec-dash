import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom'

import uuidValidate from 'uuid-validate'

// import SideBarPage from '../pages/subPages/sideBar'

import PagesRoute from '../pages'

class PrivateRoute extends Component {

  render() {
    if (uuidValidate(this.props.auth.token)) {
      return (
        <div className='div-main'>
          {/* <div className='div-sideBar'>
            <SideBarPage />
          </div> */}
          <div className='div-body'>
            <Switch>
              <Route path='/logged' component={PagesRoute} />
            </Switch>
          </div>
        </div>
      )
    } else {
      return <Redirect to='/login' />
    }
  }
}

export default PrivateRoute