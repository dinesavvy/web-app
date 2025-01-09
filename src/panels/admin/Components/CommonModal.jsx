import React from 'react'
import modalbg from "../../../assets/images/modalbg.png";
import { Modal } from 'antd';

const CommonModal = ({modal2Open,setModal2Open,modalImage}) => {
  return (
    <Modal
    centered
    open={modal2Open}
    onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
    closable={false} // Removes the close button in the header
    footer={null} 
  >
    <div className="modalbg">
        <img src={modalbg} alt="" />
    </div>
    <div className="modalImage mb-30">
        <img src={modalImage} alt="" />
    </div>
    <div className="text-center mb-30">
        <div className="fs-26 fw-700 mb-15">  
        Delete Team Member
        </div>
        <div className='fs-18'>
        Are you sure you want to remove <span className="fw-600">
        Leslie Alexander</span> from the team?
        </div>
    </div>
    <div className="div d-flex align-center gap-16">
        <div className="btn w-100">
        Cancel
        </div>
        <div className="btn btnSecondary w-100">
        Delete
        </div>
    </div>  
  </Modal>
  )
}

export default CommonModal