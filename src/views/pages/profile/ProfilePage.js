import React, { Component } from 'react'
import _ from 'lodash'
import { PageHeader, ListGroup, ListGroupItem, ButtonGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import moment from 'moment'
import { GITHUB_NAME } from '../../../config'
import { githubProfileActions } from '../../../redux/github'  
import { Container } from '../../components'
import { store } from '../../../utils'

class ProfilePage extends Component {
  constructor() {
    super()

    this.state = {
      githubUser: GITHUB_NAME,
    }

    this.setReloadData = this.setReloadData.bind(this)
  }
  componentDidMount() {
    this.reloadData()
  }

  handleGithubProfile(name) {
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

  async setReloadData() {
    const { githubUser } = this.state
    await this.props.reloadGithibProfile(githubUser)
    await this.reloadData()
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
    const profile = this.getProfile()
    const btnGroups = [GITHUB_NAME, 'NotFoundData', 'facebook']
    return (
      <Container>
        <PageHeader>Github Profile</PageHeader>
        <ButtonGroup>
          {
            btnGroups.map((item, i) => (
              <Button 
                key={i} 
                onClick={() => this.handleGithubProfile(item)} 
                bsStyle={item === githubUser ? 'primary' : 'default'}
              >
                {item}
              </Button>
            ))
          }
        </ButtonGroup>
        <hr />
        {
          profile.isFetching ? (
            <div className='text-center'>
              <h3>Loading . . .</h3> 
            </div>
          ) : (
            !profile.error ? (
              <ListGroup>
                {
                  profile.data.map(item => (
                    <ListGroupItem
                      key={item.id}
                      header={item.full_name} 
                      href={item.html_url} 
                      target='_blank' 
                      bsStyle='info'
                    >
                      {item.description}
                      <div key={item.id} className='pull-right'>
                        {moment(item.updated_at, "YYYYMMDD").fromNow()}
                      </div>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            ) : (
              <div className='text-center'>
                <h3>{profile.error}</h3>
                <Button onClick={this.setReloadData}>Reload</Button>
              </div>
            )
           
          )
        }
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  keys: store(state).github.profile.keys,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  githubProfile: (name) => dispatch(githubProfileActions.githubProfile(name)),
  reloadGithibProfile: (name) => dispatch(githubProfileActions.reloadGithibProfile(name)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage)

