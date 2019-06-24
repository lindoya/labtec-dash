import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import uuidValidate from 'uuid-validate'
import Dash from './Dash';

import CompanyRoute from './Company'
import EquipRoute from './Equip'
import EntranceRoute from './Entrance';
import PecaRoute from './Peca'
import AnaliseRoute from './Analise'


class PagesRoute extends Component {

  render() {

    if (uuidValidate(this.props.auth.token)){
      return (
          <Switch>
            <Route exact path='/logged/dash' component={Dash}/>
            <Route path='/logged/entrance' component={EntranceRoute}/>
            <Route path='/logged/analise' component={AnaliseRoute}/>
            <Route path='/logged/company' component={CompanyRoute}/>
            <Route path='/logged/equip' component={EquipRoute}/>
            <Route path='/logged/peca' component={PecaRoute}/>
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