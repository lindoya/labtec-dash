import React, { Component } from 'react'
import './index.css'
import { Input, Tooltip, Icon } from 'antd';
import 'antd/dist/antd.css';


class Login extends Component {
  render() {
    return (
      <div className='div-main-login'>
      <Input
        className='formUserLogin'
        placeholder='Digite seu username'
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={
          <Tooltip title="Extra information">
            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />
      </div>
    )
  }
}

export default Login;