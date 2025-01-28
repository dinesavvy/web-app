import React, { useEffect, useState } from "react";
import burgerMenu from "../../assets/images/burgerMenu.svg";
import notification from "../../assets/images/notification.svg";
import cartIcon from "../../assets/images/cartIcon.svg";
import arrowRight from "../../assets/images/arrowRight.svg";
import "../../assets/css/header.css";
import SelectModal from "../../panels/merchant/auth/SelectModal";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  businessListAction,
  businessListHandler,
} from "../../redux/action/businessAction/businessListSlice";

const Header = ({ handleTrigger }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  const location = useLocation();
  const getRestaurantName = localStorage.getItem("restaurantName");
  const getMerchantBusinessSelector = JSON.parse(localStorage.getItem("selectedBusiness"));
  const businessListSelector = useSelector((state) => state?.businessList);
  console.log(getMerchantBusinessSelector, "getMerchantBusinessSelector");

  // if (!isOpen) return null;

  useEffect(() => {
    if (isModalOpen) {
      let payload = {
        page: 1,
        limit: 10,
      };
      dispatch(businessListHandler(payload));
    }
  }, [isModalOpen]);

  // Sample items (can be dynamically loaded from an API or database)
  const items = [
    { name: "McDold's", address: "10 N Carpenter St, Chicago, IL - MapQuest" },
    { name: "McDond's", address: "10 N Carpenter St, Chicago, IL - MapQuest" },
    { name: "Mconald's", address: "10 N Carpenter St, Chicago, IL - MapQuest" },
    { name: "Mcona  's", address: "10 N Carpenter St, Chicago, IL - MapQuest" },
  ];

  // Open/Close Modal
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
    // let payload = {
    //   page: 1,
    //   limit: 10,
    // };
    // dispatch(businessListHandler(payload));
  };

  useEffect(() => {
    let payload = {
      page: 1,
      limit: 10,
    };
    dispatch(businessListHandler(payload));
  }, []);

  // useEffect(() => {
  //   if (businessListSelector?.data?.statusCode === 200) {
  //     setModalOpen(true);
  //   }
  // }, [businessListSelector]);

  // Handle Selection
  const handleSelect = (item) => {
    setSelectedItem(item);
    localStorage.setItem("selectedBusiness", JSON.stringify(item));
  };

  const pageTitles = {
    "/admin/merchant/list": "Merchants",
    "/admin/merchant/followers": "Followers",
    "/admin/nudges": "Nudges",
    "/admin/merchant/details": `Merchants - ${getRestaurantName}`,
    "/admin/followerList/followerDetails": "Followers",
  };

  return (
    <>
      <header className="d-flex align-center justify-between gap-20">
        <div className="d-flex align-center gap-20">
          <div onClick={handleTrigger} className="burgerMenu">
            <img src={burgerMenu} alt="icon" />
          </div>
          {/* <div className="fs-24 fw-600">Dine Savvy Dashboard</div> */}
          {pageTitles[location.pathname] && (
            <div className="fs-24 fw-600">{pageTitles[location.pathname]}</div>
          )}
        </div>
        <div className="d-flex align-center gap-20">
          {/* <div className="notification">
          <img src={cartIcon} alt="icon" className="h-100" />
          <div className="sup">
            4
          </div>
        </div> */}
          <div
            className="d-flex selectCommon cursor-pointer align-center gap-6 "
            onClick={toggleModal}
          >
            <div className="fs-16">
              {/* {selectedItem ? `${getMerchantBusinessSelector}` : "Select Business"} */}
              {/* {JSON.parse(getMerchantBusinessSelector)?.businessName || "Select Business"} */}
              {businessListSelector
                ? businessListSelector?.data?.data?.records?.[0]?.businessName
                : getMerchantBusinessSelector?.businessName}
            </div>
            <div className="h16">
              <img src={arrowRight} alt="arrowRight" />
            </div>
          </div>
          {/* Modal Component */}

          <div className="notification">
            <img src={notification} alt="icon" className="h-100" />
          </div>
        </div>
      </header>
      <SelectModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onSelect={handleSelect}
        items={items}
        selectedItem={selectedItem}
        businessListSelector={businessListSelector}
      />
    </>
  );
};

export default Header;
