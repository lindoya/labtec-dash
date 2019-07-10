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
import TecnicoRoute from './Tecnico';
import TypeAccountRoute from './TypeAccount';
import NewUserRoute from './NovoUsuario';
import AcessoriosRoute from './Acessorios';


class PagesRoute extends Component {

  render() {

    if (uuidValidate(this.props.auth.token)){
      return (
          <Switch>
            <Route exact path='/logged/dash' component={Dash}/>
            <Route path='/logged/entrance' component={EntranceRoute}/>
            <Route path='/logged/analise' component={AnaliseRoute}/>
            <Route path='/logged/user' component={NewUserRoute}/>
            <Route path='/logged/typeAccount' component={TypeAccountRoute}/>
            <Route path='/logged/tecnico' component={TecnicoRoute}/>
            <Route path='/logged/company' component={CompanyRoute}/>
            <Route path='/logged/equip' component={EquipRoute}/>
            <Route path='/logged/peca' component={PecaRoute}/>
            <Route path='/logged/acessories' component={AcessoriosRoute}/>
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