import React, { useContext, useEffect, useState } from "react";
import burgerMenu from "../../assets/images/burgerMenu.svg";
import notification from "../../assets/images/notification.svg";
import cartIcon from "../../assets/images/cartIcon.svg";
import arrowRight from "../../assets/images/arrowRight.svg";
import "../../assets/css/header.css";
import SelectModal from "../../panels/merchant/auth/SelectModal";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { businessListHandler } from "../../redux/action/businessAction/businessListSlice";
import { useBusiness } from "./BusinessContext";

const Header = ({ handleTrigger }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedBusiness, setSelectedBusiness } = useBusiness();

  const location = useLocation();
  const getRestaurantName = localStorage.getItem("restaurantName");
  const getMerchantBusinessSelector = JSON.parse(
    localStorage.getItem("selectedBusiness")
  );
  const businessListSelector = useSelector((state) => state?.businessList);

  const getMerchantLogin= localStorage.getItem("merchantLogin")

  const items = [
    { name: "McDold's", address: "10 N Carpenter St, Chicago, IL - MapQuest" },
    { name: "McDond's", address: "10 N Carpenter St, Chicago, IL - MapQuest" },
    { name: "Mconald's", address: "10 N Carpenter St, Chicago, IL - MapQuest" },
    { name: "Mcona  's", address: "10 N Carpenter St, Chicago, IL - MapQuest" },
  ];

  // Open/Close Modal
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if(getMerchantLogin){
      let payload = {
        page: 1,
        limit: 10,
      };
      dispatch(businessListHandler(payload));
    }
  }, []);

 
  // Handle Selection
  const handleSelect = (item) => {
    setSelectedBusiness(item);
    window.location.reload("/merchant/dashboard")
    setModalOpen(false);
  };


  const pageTitles = {
    "/admin/merchant/list": "Merchants",
    "/admin/merchant/dashboard": "Dashboard",
    "/admin/merchant/followers": "Followers",
    "/admin/nudges": "Nudges",
    "/admin/suppliers": "Suppliers",
    "/admin/distributors": "Distributors",
    "/admin/merchant/details": `Merchants - ${getRestaurantName}`,
    "/admin/followerList/followerDetails": "Followers",
    "/merchant/dashboard": "Merchant Dashboard",
    "/merchant/followers": "Followers",
    "/merchant/nudges": "Nudges",
    "/admin/nudges/template": "Nudge Templates",
    "/merchant/hierarchy":"Profile Hierarchy",
    "/merchant/profile":"Profile",
    "/merchant/create-nudge":"Nudges",
    "/admin/merchant/edit-member": `Merchants - ${getRestaurantName}`,
  };

  return (
    <>
      <header className="d-flex align-center justify-between gap-20">
        <div className="d-flex align-center gap-20">
          <div onClick={handleTrigger} className="burgerMenu">
            <img src={burgerMenu} alt="icon" />
          </div>
          {/* <div className="fs-24 fw-600">Dine Savvy Dashboard</div> */}
          {pageTitles[location?.pathname] && (
            <div className="fs-24 fw-600">{pageTitles[location?.pathname]}</div>
          )}
        </div>
        <div className="d-flex align-center gap-20">
          {/* <div className="notification">
          <img src={cartIcon} alt="icon" className="h-100" />
          <div className="sup">
            4
          </div>
        </div> */}
          {/* {getMerchantBusinessSelector!==null && ( */}
          {/* {businessListSelector?.data?.data?.records?.length > 0 && localStorage.getItem("merchantLogin")===true &&selectedBusiness !==undefined &&  ( */}
            <div
              className="d-flex selectCommon cursor-pointer align-center gap-6 "
              onClick={toggleModal}
            >
              <div className="fs-16">
                <>
                   {selectedBusiness?.businessName
                    ? selectedBusiness?.businessName
                    : businessListSelector?.data?.data?.records?.[0]
                        ?.businessName} 
                </>
              </div>
              <div className="h16">
                <img src={arrowRight} alt="arrowRight" />
              </div>
            </div>
           {/* )}  */}
          {/* )} */}
          {/* Modal Component */}

          <div className="notification">
            <img src={notification} alt="icon" className="h-100" />
          </div>
        </div>
      </header>
      {/* {localStorage.getItem("merchantLogin")===true&& ( */}
      <SelectModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onSelect={handleSelect}
        items={items}
        // selectedItem={selectedItem}
        businessListSelector={businessListSelector}
        selectedBusiness={selectedBusiness}
      />
        {/* )}   */}
    </>
  );
};

export default Header;
