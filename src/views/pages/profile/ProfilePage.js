import React, { Component } from 'react'
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import moment from 'moment'
import { githubProfileActions } from '../../../redux/github'  
import { Container } from '../../components'
import { store } from '../../../utils'
import { GitHubProfile } from '../../../redux/model'

class ProfilePage extends Component {
  componentDidMount() {
    const { profile } = this.props
    const name = 'Weerapat1993'
    if(profile.isReload) {
      this.props.githubProfile(name)
    }
  }

  render() {
    const { profile, data } = this.props
    return (
      <Container>
        <PageHeader>Github Profile</PageHeader>
        {
          profile.isFetching ? (
            <h3>Loading . . .</h3>  
          ) : (
            <ListGroup>
              {
                data.map(item => (
                  <ListGroupItem
                    key={item.id}
                    header={item.full_name} 
                    href={item.html_url} 
                    target='_blank' 
                    bsStyle='info'
                  >
                      {item.description}
                      <div className='pull-right'>
                        {moment(item.updated_at, "YYYYMMDD").fromNow()}
                      </div>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          )
        }
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: GitHubProfile(store(state).github.profile.data).orderBy('updated_at', 'desc').get(),
  profile: store(state).github.profile
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  githubProfile: (name) => dispatch(githubProfileActions.githubProfile(name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage)

