import { Modal } from 'antd'
import React from 'react'

const SavvyNudgeModal = ({modalState,setModalState}) => {
  return (
    <>
    <Modal
          centered
          open={modalState?.isVisible}
          onOk={() => setModalState({ isVisible: false, actionType: "" })}
          onCancel={() => setModalState({ isVisible: false, actionType: "" })}
          closable={false}
          footer={null}
        >
          <div className="text-center mb-30">
            <div className="fs-26 fw-700 mb-15">
              {modalState?.actionType === "accept" ? "Accept" : "Decline"} Savvy
              Nudge?
            </div>
            <div className="fs-18">
              {modalState?.actionType === "accept"
                ? "Are you sure you want to accept this Nudge? It will become visible to all your customers."
                : "Are you sure you want to decline this Nudge? It will not be shown to any of your customers."}
            </div>
          </div>
          <div className="div d-flex align-center gap-16">
            <div
              className="btn btnSecondary w-100"
              onClick={() =>
                setModalState({ isVisible: false, actionType: "" })
              }
            >
              Yes
            </div>
            <div
              className="btn w-100"
              onClick={() =>
                setModalState({ isVisible: false, actionType: "" })
              }
            >
              Cancel
            </div>
          </div>
        </Modal>
    
    </>
  )
}

export default SavvyNudgeModal
