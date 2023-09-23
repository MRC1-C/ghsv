import { QrcodeOutlined } from '@ant-design/icons';
import { QRCode, Button, Modal } from 'antd'
import React, { useState } from 'react'

const QrCode = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div onClick={showModal} style={{display: 'inline',position: 'fixed',right: 20, top: 12,cursor: 'pointer',zIndex: 99}}>
        <QrcodeOutlined style={{fontSize: 28}}/>
      </div>
      <Modal title="QR" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} style={{ display: 'flex', justifyContent: 'center' }}>
        <QRCode size={300} value='https://www.youtube.com/watch?v=lWA2pjMjpBs&list=RDlWA2pjMjpBs&start_radio=1' />
      </Modal>

    </div>
  )
}

export default QrCode