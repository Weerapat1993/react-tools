import { Modal } from 'antd'

const LinkConfirm = (title, url) => {
  Modal.confirm({
    title,
    content: url,
    onOk() {
      window.open(url)
    },
    onCancel() {
      
    },
  });
}

export default LinkConfirm
