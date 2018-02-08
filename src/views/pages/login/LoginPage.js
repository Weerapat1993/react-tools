import React from 'react';
import { Button, Row, Form, Input } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
  const handleSubmit = (e) => {
    console.log(e)
  }

  return (
    <div className='login-form'>
      <Link to='/'>
      <div className='ant-login-logo'>
        <img alt="logo" src={logo} className='ant-login-logo-img' />
        <span className='ant-login-logo-span'>ANT ADMIN</span>
      </div>
      </Link>
      <form>
        <FormItem onSubmit={handleSubmit} hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                type: 'email',
                min: 6,
                max: 100,
              },
            ],
          })(<Input placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                min: 6,
                max: 24,
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
          <div className='text-center'>
            <span><Link to='/'>Back to home</Link></span>
          </div>
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
