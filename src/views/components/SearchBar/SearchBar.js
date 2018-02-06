import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Navbar, InputGroup, Button, FormControl, FormGroup } from 'react-bootstrap'
import { githubSearchActions } from '../../../redux/github'
import { searchValidation } from '../../../validation'
import { store } from '../../../utils'

class SearchBar extends Component {
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
    return (
      <form onSubmit={this.handleSubmit}>
        <Navbar.Form pullLeft>
          <FormGroup controlId="formSearchBar" >
            <InputGroup>
              <FormControl 
                type="text" 
                placeholder="Github Search"
                bsSize='sm'
                onChange={(e) => this.handleChange(e, 'value')}
              />
              <InputGroup.Button>
                <Button bsSize='sm' bsStyle='success'>Search</Button>
              </InputGroup.Button>
            </InputGroup>
            <FormControl.Feedback />
            { validation.value ? <div className='validation-white'>{validation.value}</div> : <div className='validation-white'></div> }
          </FormGroup>
        </Navbar.Form>
      </form>
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
)(SearchBar)
