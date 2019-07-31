import React, { Component } from 'react'
import { Menu, Icon, Tooltip, message } from 'antd';
import './index.css'
import { Redirect } from 'react-router-dom'
import { Logout } from '../../pages/Login/LoginRedux/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const SubMenu = Menu.SubMenu;

class Sider extends Component {

  state = {
    current: '0',
    redirect: false,
    open: [],
  };

  onClose = e => {
    console.log(e, 'I was closed.');
  };

  warning = () => {
    message.warning('Há uma análise em andamento');
  };

  logout = async () => {
    // const token = localStorage.getItem('token')
    // token.replace(/"/ig, '')
    
    // console.log(token)
    // await Logout(token)    //aqui não apaga no banco de dados

    if (this.props.analyze.serialNumber) {
      return this.warning()
    }

    await this.props.Logout(this.props.auth.token)
    
    this.setState({
        current: 'logout',
        redirect: true,
      })

  }

  handleClick = e => {
    
    this.setState({
      current: e.key,
      redirect: true,
      open: [
        e.keyPath[1]
      ]
    })
  }

  handleClickCompany = (current, keyPath) => {
    
    this.setState({
      current,
      redirect: true,
      open: [
        keyPath
      ]
    })
  }

  changeRedirectState = () => {
    this.setState({
      redirect: false
    })
  }

  render() {
    // console.log(this.props)
    if (this.state.redirect) {
      this.changeRedirectState()
      switch (this.state.current) {
        case 'entrada_add':
          return <Redirect to='/logged/entrance/add' />
        case 'analise_add':
          return <Redirect to='/logged/analise/add' />
        case 'tecnico_dash':
          return <Redirect to='/logged/tecnico/dash' />
        case 'typeAccount_dash':
          return <Redirect to='/logged/typeAccount/dash' />
        case 'user_add':
          return <Redirect to='/logged/user/add' />
        case 'company_add':
          return <Redirect to='/logged/company/add' />
        case 'company_dash':
          return <Redirect to='/logged/company/dash' />
        case 'equip_dash':
          return <Redirect to='/logged/equip/dash' />
        case 'equip_add':
          return <Redirect to='/logged/equip/add' />
        case 'equip_addType':
          return <Redirect to='/logged/equip/addType' />
        case 'peca_add':
          return <Redirect to='/logged/peca/add' />
        case 'peca_dash':
          return <Redirect to='/logged/peca/dash' />
        case 'acessories_add':
          return <Redirect to='/logged/acessories/add' />
        case 'screenControl_dash':
          return <Redirect to='/logged/screenControl/dash' />
        case 'logout':
          return <Redirect to='/login' />
        default:
          return <Redirect to='/logged/dash' />
      }
    }
    return (
      <div>
        <div className='menuIcon'>

          <Tooltip placement="bottom" title={'Logout'} >
            <Icon key='logout' className='menuIcon-icon' type="logout" 
            onClick={() => this.logout()}
            />
          </Tooltip>

          <Tooltip placement="bottom" title={'Empresas'} >
            <Icon className='menuIcon-icon' type="bank" onClick={()=> this.handleClickCompany("company_dash", "Empresas")}/>
          </Tooltip>

          <Tooltip placement="bottom" title={'Equipamentos'}>
            <Icon className='menuIcon-icon' type="printer" onClick={()=> this.handleClickCompany("equip_dash", "Equipamento")} />
          </Tooltip>

          <Tooltip placement="bottom" title={'Peças'}>
            <Icon className='menuIcon-icon' type="setting" onClick={()=> this.handleClickCompany("peca_dash", "Pecas")} />
          </Tooltip>
 
          <Tooltip placement="bottom" title={'Nova entrada'}>
            <Icon className='menuIcon-icon' type="form" onClick={()=> this.handleClickCompany("entrada_add", "LabTec")}/>
          </Tooltip>

        </div>

        <Menu
          className='menu'
          theme='dark'
          onClick={this.handleClick}
          defaultOpenKeys={this.state.open}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          
          <SubMenu
            key="LabTec"
            title={
              <span>
                <Icon type="form" />
                <span>LabTec</span>
              </span>
            }
          >
            <Menu.Item key="entrada_add" disabled={!this.props.auth.addEntry}><Icon type="form" />Nova entrada</Menu.Item>
            <Menu.Item key="analise_add" disabled={!this.props.auth.addAnalyze || !this.props.analyze.serialNumber}><Icon type="line-chart" />Análise</Menu.Item>
            <Menu.Item key="tecnico_dash" disabled={!this.props.auth.tecnico 
              || !this.props.analyze.analysisCompleted
              }><Icon type="user" />Técnico</Menu.Item>

            
          </SubMenu>

          <SubMenu
            key="Empresas"
            title={
              <span>
                <Icon type="bank" />
                <span>Empresas</span>
              </span>
            }
          >
            <Menu.Item key="company_add" disabled={!this.props.auth.addCompany}><Icon type="form" />Cadastrar</Menu.Item>
            <Menu.Item key="company_dash"><Icon type="edit" />Gerenciar</Menu.Item>
          </SubMenu>

          <SubMenu
            key="Equipamento"
            title={
              <span>
                <Icon type="printer" />
                <span>Equipamento</span>
              </span>
            }
          >
            <Menu.Item key="equip_add" disabled={!this.props.auth.addEquip}><Icon type="form" /> Cadastrar</Menu.Item>
            <Menu.Item key="equip_dash"><Icon type="edit" /> Gerenciar</Menu.Item>

            <Menu.Item key="equip_addType" disabled={!this.props.auth.addEquipType}><Icon type="edit" /> Gerenciar marcas</Menu.Item>
          </SubMenu>

          <SubMenu
            key="Pecas"
            title={
              <span>
                <Icon type="setting" />
                <span>Peças</span>
              </span>
            }
          >
            <Menu.Item key="peca_add" disabled={!this.props.auth.addPart}><Icon type="form" />Nova peça</Menu.Item>
            <Menu.Item key="peca_dash"><Icon type="edit" />Gerenciar</Menu.Item>
            <Menu.Item key="acessories_add" disabled={!this.props.auth.addAccessories}><Icon type="setting" />Acessórios</Menu.Item>
          </SubMenu>

          <SubMenu
            key="Contas"
            title={
              <span>
                <Icon type="usergroup-add" />
                <span>Contas</span>
              </span>
            }
          >
            <Menu.Item key="typeAccount_dash" disabled={!this.props.auth.addTypeAccount}><Icon type="profile" />Tipo conta</Menu.Item>
            <Menu.Item key="user_add" disabled={!this.props.auth.addUser}><Icon type="user-add" />Novo usuário</Menu.Item>
            <Menu.Item key="screenControl_dash"><Icon type="area-chart" />Tela de controle</Menu.Item>

          </SubMenu>
  
        </Menu>
      </div>
    );
  }
}


function mapDispacthToProps(dispach) {
  return bindActionCreators ({ Logout }, dispach)
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
    analyze: state.analyze,
  }
}

export default connect (mapStateToProps, mapDispacthToProps)(Sider)