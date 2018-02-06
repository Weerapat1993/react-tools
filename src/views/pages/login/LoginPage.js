import React from 'react';
import { Button, Row, Form, Input } from 'antd'
import PropTypes from 'prop-types'
import logo from '../../assets/images/logo.svg'
import '../../styles/login.css'

const FormItem = Form.Item

const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  return (
    <div className='login-form'>
      <div className='logo'>
        <img alt="logo" src={logo} className='logo-img' />
        <span className='logo-span'>ANT ADMIN</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" placeholder="Password" />)}
        </FormItem>
        <Row>
          <Button type="primary">
            Sign in
          </Button>
          <p>
            <span>Username：guest</span>
            <span>Password：guest</span>
          </p>
        </Row>

      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default (Form.create()(Login))
