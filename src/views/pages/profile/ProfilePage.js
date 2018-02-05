import React, { Component } from 'react'
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { githubProfileActions } from '../../../redux/github'  
import { Container } from '../../components'
import { store } from '../../../utils';

class ProfilePage extends Component {
  componentDidMount() {
    const { profile } = this.props
    const name = 'Weerapat1993'
    if(profile.isReload) {
      this.props.githubProfile(name)
    }
  }

  render() {
    const { profile } = this.props
    return (
      <Container>
        <PageHeader>Profile</PageHeader>
        {
          profile.isFetching ? (
            <h3>Loading . . .</h3>  
          ) : (
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
  profile: store(state).github.profile
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  githubProfile: (name) => dispatch(githubProfileActions.githubProfile(name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage)

