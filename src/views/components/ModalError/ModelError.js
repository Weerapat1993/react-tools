import { message } from 'antd'

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

export const modalError = (error) => {
  message.error(getErrorMessage(error));
  // Modal.error({
  //   title: 'Error!',
  //   content: getErrorMessage(error),
  // });
}