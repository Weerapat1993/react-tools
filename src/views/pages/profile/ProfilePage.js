import React, { Component } from 'react'
import _ from 'lodash'
import { Radio, Button, List, Avatar } from 'antd'
import moment from 'moment'
import { GITHUB_NAME } from '../../../config'
import { withProfileGithub } from '../../../redux/github'  
import { LinkConfirm, Loading } from '../../components'

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
    const title = 'Do you Want to open github profile?'
    LinkConfirm(title, url)
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
      <div>
        <h1>Github Profile</h1>
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
        <Loading 
          isLoading={profile.isFetching}
          error={profile.error}
          onReload={() => this.props.handleGithubProfile(githubUser)}
        >
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
        </Loading>
      </div>
    )
  }
}

export default withProfileGithub(ProfilePage)

