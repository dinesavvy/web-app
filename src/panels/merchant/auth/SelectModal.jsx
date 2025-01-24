import { Modal } from "antd";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import rightactive from "../../../assets/images/rightactive.svg";
import React from "react";

const SelectModal = ({ isOpen, onClose, onSelect, items,selectedItem  }) => {
  if (!isOpen) return null;
  return (
    <Modal
      centered
      visible={isOpen} // Control the visibility of the modal  // Handle close
      footer={null} // Hide the footer (buttons)
      closable={false}
      className="selecModal"
    >
      <div className="">
        <div className="topPadding d-flex justify-between align-center">
          <div className="fs-26 fw-700">Your Business</div>
          <div className="closeSidebar" onClick={() =>onClose()}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        {/* List of items */}
       <div className="padding30">
       {items.map((item, index) => (
           <div
            key={index}
            className={`modal-item d-flex justify-between align-center gap-16 ${
                selectedItem?.name === item.name ? "active" : ""
              }`}
            onClick={() => {
                onSelect(item); // Select the item
              onClose(); // Close the modal
            }}
          >
            <div>
            <div className="fs-18 fw-500 mb-4">{item.name}</div>
            <div className="fs-14 grey">{item.address}</div>
            </div>
            <div className="rightIcon">
              <img src={rightactive} alt="rightactive" />
            </div> 
          </div>
        ))}
       </div>
      </div>
    </Modal>
  );
};

export default SelectModal;
