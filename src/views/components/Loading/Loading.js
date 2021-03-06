import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Spin, Button } from 'antd'
import { modalError } from '../ModalError'

class Loading extends Component {
  componentWillReceiveProps(nextProps) {
    const { error } = this.props
    if(error !== nextProps.error && nextProps.error) {
      modalError(nextProps.error)
    }
  }

  render() {
    const { isLoading, error, children, onReload } = this.props
    return isLoading ? (
      <Row>
        <Col span={24} className='text-center'>
          <Spin size="large" />
          <h2>Loading</h2>
        </Col>
      </Row>
    ) : (
      !error ? children : (
        <div className='text-center'>
          <h3>{error}</h3>
          { onReload ? <Button onClick={onReload}>Reload</Button> : null }
        </div>
      )
    )
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onReload: PropTypes.func,
}

Loading.defaultProps = {
  error: '',
}

export default Loading
