/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import './index.css'
import { Input, Icon, Button } from 'antd';
import 'antd/dist/antd.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeValue, onSubmit } from '../LoginRedux/action'

class Login extends Component {

  onSubmit = async() => {
    await this.props.onSubmit(this.props.value)
  }

  render() {
    return (
      <div className='div-main-login'>
      <label><h1 className='LabelLogin'>Tec - Lab</h1></label>
      <img src='../../retina.png' className='img-Login'/>
        <Input
          className='InputUsernameLogin'
          placeholder='Digite seu username'
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
        <Input.Password
          className='InputPasswordLogin'
          placeholder="Digite a senha"
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
        <div className='div-ButtonLogin'>
        <Button 
          onClick={this.onSubmit}
          className='ButtonPaswordLogin'
          type="primary">Login</Button>
      </div>
      </div>
    )
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators ({ changeValue, onSubmit }, dispach)
}

function mapStateToProps (state) {
  return {
    value: state.login,
  }
}

export default connect (mapStateToProps, mapDispacthToProps)(Login)