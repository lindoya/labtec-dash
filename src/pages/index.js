import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
import { auth } from '../services/auth'
import { Logout } from './Login/LoginRedux/action'



class PagesRoute extends Component {

  state = {
    auth: true
  }

  logout = async () => {
    await this.props.Logout(this.props.auth.token)
  }

  auth = async () => {
    // console.log('hduad yua')
    const value = {
      token: this.props.auth.token,
      username: this.props.auth.username
    }

    let response = {}

    response = await auth(value).then(
      resp => this.setState({
        auth: resp.data
      }, 
      // console.log(this.state)
      )
    )

    return response
  }

  componentDidMount = () => {
    this.auth()
  }

  render() {
    if (this.state.auth){
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
      this.logout()
      return <Redirect to='/login' />
    }
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ Logout }, dispach)
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
  }
}

export default connect (mapStateToProps, mapDispacthToProps)(PagesRoute)