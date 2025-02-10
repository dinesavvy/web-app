import React, { useEffect } from "react";
import { Modal } from "antd";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import { useNavigate } from "react-router-dom";

const AddGroupNameModal = ({ isAddGroupNameModal, setAddGroupNameModal  }) => {
  const navigate = useNavigate()
  return (
    <>
      <Modal
        centered
        open={isAddGroupNameModal}
        onOk={() => setAddGroupNameModal(false)}
        onCancel={() => setAddGroupNameModal(false)}
        closable={false} // Removes the close button in the header
        footer={null}
        //  className="selecModal"
      >
        <div className="">
          <div className=" d-flex justify-between align-center">
            <div className="fs-26 fw-700">Create Group</div>
            <div
              className="closeSidebar"
              onClick={() => setAddGroupNameModal(false)}
            >
              <img src={closeRightSidebar} alt="closeRightSidebar" />
            </div>
          </div>
          <div className="divider2"></div>
          <div className="mb-30">
            <label htmlFor="" className="fs-14 fw-500 mb-10">
              Group Name
            </label>
            <input type="text" placeholder="Enter Group name " />
          </div>
          <div className="d-flex gap-10 justify-end flexBtn">
            <div
              className="btnSecondary w-100 btn"
              onClick={() => setAddGroupNameModal(false)}
            >
              Cancel
            </div>
            <div
              className="w-100 btn"
              onClick={() => {setAddGroupNameModal(false);navigate("/admin/group/list")}}
            >
              Continue
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddGroupNameModal;
