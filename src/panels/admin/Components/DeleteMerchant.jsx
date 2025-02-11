import { Modal } from 'antd'
import React from 'react'
import modalbg from "../../../assets/images/modalbg.png";
import deleteModal from "../../../assets/images/deleteModal.svg";

const DeleteMerchant = ({setIsDelete,isDelete}) => {
  return (
    <>
     <Modal
        centered
        open={isDelete}
        onOk={() => setIsDelete(false)}
        onCancel={() => setIsDelete(false)}
        closable={false} // Removes the close button in the header
        footer={null}
      >
        <div className="modalbg">
          <img src={modalbg} alt="" />
        </div>
        <div className="modalImage mb-30">
          <img src={deleteModal} alt="" />
        </div>
        <div className="text-center mb-30">
          <div className="fs-26 fw-700 mb-15"> Remove Merchant</div>
          <div className="fs-18">
          Are you sure you want to remove 
            <span className="fw-600"> The Cheescake Factory</span> from
            from the group?
          </div>
        </div>
        <div className="div d-flex align-center gap-16">
          <div className="btn w-100" onClick={() => setIsDelete(false)}>
            Cancel
          </div>
          <div className="btn btnSecondary w-100" >
            Delete
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DeleteMerchant