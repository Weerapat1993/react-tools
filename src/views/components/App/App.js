import React from 'react'
import Case from 'case'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { SearchBar } from '../SearchBar'
import withSizes from 'react-sizes'
import logo from '../../assets/images/logo.svg'
import './styles.css'
import { store } from '../../../utils'
import { githubSearchActions } from '../../../redux/github';
import Routes from '../../routes'
import { sideMenu } from '../../../config'

const { Header, Content, Footer, Sider } = Layout

class Layouts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClearData = this.handleClearData.bind(this)
  }

  handleSubmit(value) {
    this.props.fetchGithub(value)
  }

  handleClearData() {
    this.props.clearGithubRepositories()
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  onMenuKey = ({ key, keyPath }) => {
    const { history, location } = this.props
    const route = {
      pathname: key,
      state: { keyPath }
    }
    if(key !== location.pathname) {
      history.push(route)
    }
  }

  getSize() {
    const { isMobile, dimenstion } = this.props
    if(isMobile) {
      return {
        minWidth: dimenstion.width
      }
    } else { 
      return {}
    }
  }
  
  render() {
    const { location, github, dimenstion, isMobile } = this.props
    const { collapsed } = this.state
    const breadcrumbs = location.pathname.split(new RegExp('/','g')).slice(1)
    const keyPath = _.get(location, 'state.keyPath', [location.pathname])
    const searchData = [{
      title: 'Repositories',
      children: github.data,
    }];
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          onCollapse={this.onCollapse}
          style={{ zIndex: 500 }}
        >
          <div className="logo">
            <div className='ant-logo'>
              <img alt='logo' src={logo} className='ant-logo-img' />
            </div>
          </div>
          <Menu theme="dark" defaultSelectedKeys={keyPath} mode="inline" onClick={this.onMenuKey} >
            {
              sideMenu.map(item => (
                <Menu.Item key={item.path} >
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Menu.Item>
              ))
            }
          </Menu>
        </Sider>
        <Layout>
          { !collapsed && isMobile && <div className='dark-bg' /> }
          <Header style={{ background: '#fff', paddingLeft: 15, paddingRight: 15, display: 'flex', alignItems: 'center' }}>
            <SearchBar
              isFetching={github.isFetching}
              dataSource={searchData} 
              onSubmit={this.handleSubmit} 
              onClearData={this.handleClearData}
            />
          </Header>
          <Content style={{ margin: 0 }}>
            <Breadcrumb style={{ margin: '16px 24px', ...this.getSize() }}>
              <Breadcrumb.Item><Icon type="home" /> <Link to='/'>Home</Link></Breadcrumb.Item>
              {
                breadcrumbs.map((item, i) => (
                  <Breadcrumb.Item key={i}>{Case.capital(item)}</Breadcrumb.Item>
                ))
              }
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360, ...this.getSize() }}>
              {dimenstion.width}
              <Routes />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', ...this.getSize() }}>
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
  fetchGithub: (keyword) => dispatch(githubSearchActions.fetchGithub(keyword)),
  clearGithubRepositories: () => dispatch(githubSearchActions.clearGithubRepositories()),
})

const mapSizesToProps = ({ width, height }) => ({
  isMobile: width < 480,
  dimenstion: {
    width, 
    height,
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withSizes(mapSizesToProps)(Layouts))
