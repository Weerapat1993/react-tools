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
import Routes from '../../routes'
import { sideMenu } from '../../../config'

const { Header, Content, Footer, Sider } = Layout

class Layouts extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClearData = this.handleClearData.bind(this)
  }

  handleSubmit(value) {
    this.props.fetchGithub(value)
  }

  handleClearData() {
    this.props.clearGithubRepositories()
  }

  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
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
  
  render() {
    const { location, github } = this.props
    const breadcrumbs = location.pathname.split(new RegExp('/','g')).slice(1)
    const keyPath = _.get(location, 'state.keyPath', [location.pathname])
    const searchData = [{
      title: 'Repositories',
      children: github.data,
    }];
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
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
          <Header style={{ background: '#fff', paddingLeft: 15, paddingRight: 15, display: 'flex', alignItems: 'center' }}>
            <SearchBar
              isFetching={github.isFetching}
              dataSource={searchData} 
              onSubmit={this.handleSubmit} 
              onClearData={this.handleClearData}
            />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 8px' }}>
              <Breadcrumb.Item><Icon type="home" /> <Link to='/'>Home</Link></Breadcrumb.Item>
              {
                breadcrumbs.map((item, i) => (
                  <Breadcrumb.Item key={i}>{Case.capital(item)}</Breadcrumb.Item>
                ))
              }
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Routes />
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
  fetchGithub: (keyword) => dispatch(githubSearchActions.fetchGithub(keyword)),
  clearGithubRepositories: () => dispatch(githubSearchActions.clearGithubRepositories()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layouts)
