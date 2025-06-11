import React, { useEffect, useRef, useState } from "react";
import addMerchantIcon from "../../../assets/images/addMerchantIcon.svg";
import searchIcon from "../../../assets/images/searchIcon.svg";
import groupCardDropdown from "../../../assets/images/groupCardDropdown.svg";
import editMerchantIcon from "../../../assets/images/editMerchantIcon.svg";
import deleteMerchantIcon from "../../../assets/images/deleteMerchantIcon.svg";
import noImageFound from "../../../assets/images/noImageFound.png";
import AddGroupNameModal from "./AddGroupNameModal";
import DeleteMerchant from "./DeleteMerchant";

const GroupList = () => {
  const [isAddGroupNameModal, setAddGroupNameModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <div className="tabPadding">
        <div className="d-flex align-center justify-between gap-20 mb-20">
          <div className="fs-24 fw-600">Groups</div>
          <div
            className="btn btnSecondary p16 gap-8"
            onClick={() => setAddGroupNameModal(true)}
          >
            Create Group
            <img src={addMerchantIcon} alt="addMerchantIcon" />
          </div>
        </div>
        <div className="lineSearch w-100 mb-20">
          <input type="text" placeholder="Search Groups" autoComplete="off" />
          <img src={searchIcon} alt="" className="absoluteImage" />
        </div>
        <div className="merchantGrid">
          <div className="groupCard  position-relative flexColumn d-flex">
            <div className="groupImage">
              <div>
                <img src={noImageFound} alt="" />
              </div>
              <div>
                <img src={noImageFound} alt="" />
              </div>
              <div>
                <img src={noImageFound} alt="" />
              </div>
            </div>
            <div className="groupCardBottom d-flex flexColumn flex1  justify-between">
              <div>
                <div className="d-flex justify-between">
                  <div>
                    <div className="fs-16 fw-600">The Followed Foodies</div>
                    <div className="fs-14 lightBlack">12 Merchants</div>
                  </div>
                  <div
                    className="cursor-pointer position-relative h-fit"
                    ref={dropdownRef}
                  >
                    <div onClick={() => setIsOpen(!isOpen)}>
                      <img src={groupCardDropdown} alt="" />
                    </div>
                    {isOpen && (
                      <div className="dropdownMenu fs-16 fw-500">
                        <div className="dropdownItem ">
                          <img src={editMerchantIcon} alt="" />
                          Edit
                        </div>
                        <div
                          className="dropdownItem "
                          onClick={() => setIsDelete(true)}
                        >
                          <img src={deleteMerchantIcon} alt="" />
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="divider2"></div>
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Total Followers</div>
                    <div className="fs-14 fw-600">256</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Total Redeemed</div>
                    <div className="fs-14 fw-600">11%</div>
                  </div>
                </div>
              </div>
              <div className="btn w-100">Promote</div>
            </div>
          </div>
        </div>
      </div>
      <AddGroupNameModal
        isAddGroupNameModal={isAddGroupNameModal}
        setAddGroupNameModal={setAddGroupNameModal}
      />
      <DeleteMerchant isDelete={isDelete} setIsDelete={setIsDelete} />
    </>
  );
};

export default GroupList;
