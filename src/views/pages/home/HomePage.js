import React, { Component } from 'react'
import { 
  PageHeader, 
  FormControl, 
  FormGroup, 
  ControlLabel, 
  HelpBlock,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { githubSearchActions } from '../../../redux/github'
import { Container } from '../../components'
import { store } from '../../../utils'

class HomePage extends Component {
  constructor() {
    super()

    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 3) return 'success';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { value } = this.state
    this.props.fetchGithub(value)
  }

  render() {
    const { value } = this.state
    const { github } = this.props
    return (
      <Container>
        <PageHeader>Home</PageHeader>
        <form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Searh Github</ControlLabel>
            <FormControl
              ref='keyword'
              type="text"
              value={value}
              name='keyword'
              placeholder="Search Github"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>
        </form>
        {
          github.isFetching ? (
            <h3>Loading . . .</h3>  
          ) : (
            <ListGroup>
              {
                github.data.map(item => (
                  <ListGroupItem 
                    key={item.id}
                    header={item.full_name} 
                    href={item.html_url} 
                    target='_blank' 
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
  github: store(state).github.search
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchGithub: (keyword) => dispatch(githubSearchActions.fetchGithub(keyword))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage)
