import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Spin } from 'antd'

const Loading = ({ children, isLoading, error }) => {
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
      </div>
    )
  )
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

Loading.defaultProps = {
  error: '',
}

export default Loading
