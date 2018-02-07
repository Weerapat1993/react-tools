import React from 'react'
import Case from 'case'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { SearchBar } from '../SearchBar'
import logo from '../../assets/images/logo.svg'
import './styles.css'
import { store } from '../../../utils'
import { githubSearchActions } from '../../../redux/github';

const { Header, Content, Footer, Sider } = Layout;

class Layouts extends React.Component {
  constructor(props) {
    super(props)

    const collapsed = _.get(props.location, `state.collapsed`, false)
    this.state = {
      collapsed,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(value) {
    this.props.fetchGithub(value)
  }

  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  onMenuKey = ({ key, keyPath }) => {
    const { history, location } = this.props
    const { collapsed } = this.state
    const route = {
      pathname: key,
      state: { keyPath, collapsed }
    }
    if(key !== location.pathname) {
      history.push(route)
    }
  }
  
  render() {
    const { children, location, github } = this.props
    const { collapsed } = this.state
    const breadcrumbs = location.pathname.split(new RegExp('/','g')).slice(1)
    const keyPath = _.get(location, 'state.keyPath', [location.pathname])
    const searchData = github.data.map(item => item.full_name)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <div className='ant-logo'>
              <img alt='logo' src={logo} className='ant-logo-img' />
              {!collapsed ? <span className='ant-logo-span'>Ant Admin</span> : null}
            </div>
          </div>
          <Menu theme="dark" defaultSelectedKeys={keyPath} mode="inline" onClick={this.onMenuKey} >
            <Menu.Item key='/' >
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="/contact">
              <Icon type="phone" />
              <span>Contact</span>
            </Menu.Item>
            <Menu.Item key="/about">
              <Icon type="book" />
              <span>About</span>
            </Menu.Item>
            <Menu.Item key="/timeline">
              <Icon type="clock-circle" />
              <span>Timeline</span>
            </Menu.Item>
            <Menu.Item key="/github">
              <Icon type="github" />
              <span>Github</span>
            </Menu.Item>
            <Menu.Item key="/login">
              <Icon type="lock" />
              <span>Login</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, display: 'flex', alignItems: 'center' }}>
              <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.onCollapse}
                style={{ paddingLeft: 15, paddingRight: 15}}
              />
              <SearchBar dataSource={searchData} onSubmit={this.handleSubmit} />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item><Icon type="home" /> <Link to='/'>Home</Link></Breadcrumb.Item>
              {
                breadcrumbs.map((item, i) => (
                  <Breadcrumb.Item key={i}>{Case.capital(item)}</Breadcrumb.Item>
                ))
              }
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  github: store(state).github.search
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchGithub: (keyword) => dispatch(githubSearchActions.fetchGithub(keyword))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layouts)
