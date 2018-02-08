import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Spin, message, Button } from 'antd'

const getErrorMessage = (error) => {
  switch(error) {
    case 'Network Error':
      return 'การเชื่อมต่อล้มเหลว กรุณาเชื่อมต่ออินเตอร์เน็ต'
    case 'Not Found':
      return 'ไม่สามารถโหลดข้อมูลได้'
    default:
      return error
  }
}

const modalError = (error) => {
  message.error(getErrorMessage(error));
  // Modal.error({
  //   title: 'Error!',
  //   content: error,
  // });
}

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
