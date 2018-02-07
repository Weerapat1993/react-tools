import React, { Component } from 'react'
import _ from 'lodash'
import { PageHeader } from 'react-bootstrap'
import { Radio, Button, Modal, List, Avatar } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import { GITHUB_NAME } from '../../../config'
import { githubProfileActions } from '../../../redux/github'  
import { Layouts } from '../../components'
import { store } from '../../../utils'

class ProfilePage extends Component {
  constructor() {
    super()

    this.state = {
      githubUser: GITHUB_NAME,
    }

    this.handleGithubProfile = this.handleGithubProfile.bind(this)
  }
  componentDidMount() {
    this.reloadData()
  }

  handleGithubProfile(e) {
    const name = e.target.value
    this.setState({ githubUser: name }, () => {
      this.reloadData()
    })
  }

  reloadData() {
    const { githubUser } = this.state
    const profile = this.getProfile()
    if(profile.isReload) {
      this.props.githubProfile(githubUser)
    }
  }

  confirmUrl = (url) => {
    Modal.confirm({
      title: 'Do you Want to open github profile?',
      content: url,
      onOk() {
        window.open(url)
      },
      onCancel() {
        
      },
    });
  }

  githubProfile(select) {
    const url = `https://github.com/${select}`
    this.confirmUrl(url)
  }

  getProfile() {
    const { githubUser } = this.state
    const { keys } = this.props
    const defaultState = {
      isFetching: false,
      isReload: true,
      data: [],
      error: '',
    }
    const profile = _.get(keys, githubUser) || defaultState
    return profile
  }

  render() {
    const { githubUser } = this.state
    const { byID } = this.props
    const profile = this.getProfile()
    const btnGroups = [GITHUB_NAME, 'NotFoundData', 'facebook']
    return (
      <Layouts {...this.props}>
        <PageHeader>Github Profile</PageHeader>
        <Radio.Group onChange={this.handleGithubProfile} defaultValue={githubUser}>
          {
            btnGroups.map((item, i) => (
              <Radio.Button key={i} value={item} >{item}</Radio.Button>
            ))
          }
        </Radio.Group>
        <h5>History</h5>
        <Button.Group>
          {
            byID.map((item, i) => (
              <Button type='primary' onClick={() => this.githubProfile(item)} key={i}>{item}</Button>
            ))
          }
        </Button.Group>
        {
          profile.isFetching ? (
            <div className='text-center'>
              <h3>Loading . . .</h3> 
            </div>
          ) : (
            !profile.error ? (
              <List
                itemLayout="horizontal"
                dataSource={profile.data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.owner.avatar_url} />}
                      title={<a onClick={() => this.confirmUrl(item.html_url)} target='_blank'>{item.full_name}</a>}
                      description={item.description}
                    />
                    <div>{moment(item.updated_at, "YYYYMMDD").fromNow()}</div>
                  </List.Item>
                )}
              />
            ) : (
              <div className='text-center'>
                <h3>{profile.error}</h3>
                <Button onClick={() => this.props.handleGithubProfile(githubUser)}>Reload</Button>
              </div>
            )
          )
        }
      </Layouts>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  byID: store(state).github.profile.byID,
  keys: store(state).github.profile.keys,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  githubProfile: (name) => dispatch(githubProfileActions.githubProfile(name)),
  reloadGithibProfile: (name) => dispatch(githubProfileActions.reloadGithibProfile(name)),
  handleGithubProfile: (name) => dispatch(githubProfileActions.handleGithubProfile(name)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage)

