import React from "react";
import modalbg from "../../../assets/images/modalbg.png";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

const CommonModal = ({
  modal2Open,
  setModal2Open,
  modalImage,
  removeTeamMember,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const dispatch = useDispatch();


  // const commonOnclick = () =>{

  // }

  return (
    <>
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
          <div className="fs-26 fw-700 mb-15">End Nudge?</div>
          <div className="fs-18">
            Are you sure you want this nudge? This will remove it from all your
            customers
          </div>
        </div>
        <div className="div d-flex align-center gap-16">
          <div
            className="btn btnSecondary w-100"
            // onClick={() => {
            //   setIsSidebarOpen(false);
            //   setModal2Open(false);
            // }}
            // onClick={commonOnclick}
          >
            Yes
          </div>
          <div className="btn w-100" onClick={() => setModal2Open(false)}>
            Cancel
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CommonModal;
