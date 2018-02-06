import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
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
import { searchValidation } from '../../../validation'

class HomePage extends Component {
  static propTypes = {
    github: PropTypes.shape({
      data: PropTypes.array,
      isFetching: PropTypes.bool,
      isReload: PropTypes.bool,
      error: PropTypes.string,
    }),
  }

  constructor() {
    super()

    this.state = {
      form: {
        value: '',
      },
      validation: {
        isValidation: true,
        value: '',
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getValidationState() {
    const { value } = this.state.validation
    const isValidation = this.state.validation.isValidation
    if(isValidation) return null
    if (!value) 
      return 'success'
    else 
      return 'error'
  }

  handleChange(e, key) {
    const { form } = this.state
    const newForm = {
      ...form,
      [key]: e.target.value,
    }
    const validation = searchValidation(newForm)
    this.setState({ 
      form: newForm,
      validation
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { value } = this.state.form
    const { validation } = this.state
    if(!Object.keys(validation).length) {
      this.props.fetchGithub(value)
    }
  }

  render() {
    const { validation } = this.state
    const { value } = this.state.form
    const { github } = this.props
    return (
      <Container>
        <PageHeader>Github Search Repositories</PageHeader>
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
              onChange={(e) => this.handleChange(e, 'value')}
            />
            <FormControl.Feedback />
            { validation.value ? <HelpBlock>{validation.value}</HelpBlock> : null }
          </FormGroup>
        </form>
        {
          github.isFetching ? (
            <div className='text-center'>
              <h3>Loading . . .</h3> 
            </div>
          ) : (
            !github.error ? (
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
                        <div className='pull-right'>
                          {moment(item.updated_at, "YYYYMMDD").fromNow()}
                        </div>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            ) : (
              <div className='text-center'>
                <h3>{github.error}</h3>
              </div>
            )
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