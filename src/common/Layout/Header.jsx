import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
import burgerMenu from "../../assets/images/burgerMenu.svg";
import notification from "../../assets/images/notification.svg";
import cartIcon from "../../assets/images/cartIcon.svg";
import arrowRight from "../../assets/images/arrowRight.svg";
import "../../assets/css/header.css";
import SelectModal from "../../panels/merchant/auth/SelectModal";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { businessListHandler } from "../../redux/action/businessAction/businessListSlice";
// import { useBusiness } from "./BusinessContext";
import NotificationDrawer from "../../panels/merchant/notification/NotificationDrawer";

const Header = ({ handleTrigger }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notificationDrawer, setNotificationDrawer] = useState(false);

  const dispatch = useDispatch();
  // const { selectedBusiness, setSelectedBusiness } = useBusiness();

  const acceptInviteSelector = useSelector((state) => state?.acceptInvite);

  const location = useLocation();
  const getRestaurantName = localStorage.getItem("restaurantName");
    const getMerchantBusinessSelector = JSON.parse(
    localStorage.getItem("selectedBusiness")
  );
  const businessListSelector = useSelector((state) => state?.businessList);

  const getMerchantLogin = localStorage.getItem("merchantLogin");

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
    if (notificationDrawer) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [notificationDrawer]);



  useEffect(() => {
    if (getMerchantLogin) {
      let payload = {
        page: 1,
        limit: 100,
      };
      dispatch(businessListHandler(payload));
    }
  }, [acceptInviteSelector]);


  // Handle Selection
  const handleSelect = (item) => {
    // setSelectedBusiness(item);  
    window.location.reload();
    setModalOpen(false);
  };

  const pageTitles = {
    "/admin/merchant/list": "Merchants",
    "/admin/merchant/dashboard": "Dashboard",
    "/admin/dashboard": "Dashboard",
    "/admin/followers": "Followers",
    "/admin/nudges": "Nudges",
    "/admin/suppliers": "Suppliers",
    "/admin/distributors": "Distributors",
    "/admin/merchant/details": `Merchants - ${
      getRestaurantName
        ? getRestaurantName.charAt(0).toUpperCase() + getRestaurantName.slice(1)
        : ""
    }`,
    "/admin/followerList/followerDetails": "Followers",
    "/merchant/dashboard": "Merchant Dashboard",
    "/merchant/followers": "Followers",
    "/merchant/nudges": "Nudges",
    "/admin/nudges/template": "Nudge Templates",
    "/merchant/hierarchy": "Profile Hierarchy",
    "/merchant/profile": "Profile",
    "/merchant/create-nudge": "Nudges",
    "/merchant/promotions": "Promotions",
    "/admin/merchant/edit-member": `Merchants - ${getRestaurantName}`,
    "/admin/promotions": "Promotions",
    "/admin/brands": "Brands",
    "/admin/add-promotions": "Create single promotions",
    "/admin/brands/add": "Brands",
    "/supplier/brands": "Brands",
    "/supplier/addBrand": "Brands",
    "/supplier/add-promotions": "Create single promotions",
    "/supplier/promotion": "Promotions",
    "/distributors/add-distributor-brands": "Create single promotions",
    "/distributors/brands": "Brands",
    "/distributors/promotion": "Promotions",
    "/distributors/add-promotions": "Create single promotions",
    "/distributors/dashboard": "Distributor Dashboard",
    "/supplier/dashboard": "Supplier Dashboard",
    "/merchant/reverse-nudge": "Followers",
    "/admin/support": "Support",
    "/admin/edit-support" : "Verify Business",
    "/admin/settings" : "Settings",
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
          {/* <div
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
          </div> */}
          {/* )} 
          {/* )}  */}
          {/* Modal Component */}

          <div
            className="notification"
            // onClick={() => setNotificationDrawer(true)}
          >
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
        // selectedBusiness={selectedBusiness}
      />
      {/* )}   */}

      {notificationDrawer && (
        <NotificationDrawer
          notificationDrawer={notificationDrawer}
          setNotificationDrawer={setNotificationDrawer}
        />
      )}
    </>
  );
};

export default Header;
