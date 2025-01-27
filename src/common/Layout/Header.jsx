import React, { useState } from "react";
import burgerMenu from "../../assets/images/burgerMenu.svg";
import notification from "../../assets/images/notification.svg";
import cartIcon from "../../assets/images/cartIcon.svg";
import arrowRight from "../../assets/images/arrowRight.svg";
import "../../assets/css/header.css";
import SelectModal from "../../panels/merchant/auth/SelectModal";
import { useLocation } from "react-router-dom";

const Header = ({ handleTrigger }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const location = useLocation()
  // console.log(location.pathname,"location")
  const getRestaurantName = localStorage.getItem("restaurantName")

  // Sample items (can be dynamically loaded from an API or database)
  const items = [
    { name: "McDold's", address: '10 N Carpenter St, Chicago, IL - MapQuest' },
    { name: "McDond's", address: '10 N Carpenter St, Chicago, IL - MapQuest' },
    { name: "Mconald's", address: '10 N Carpenter St, Chicago, IL - MapQuest' },
    { name: "Mcona  's", address: '10 N Carpenter St, Chicago, IL - MapQuest' },
  ];

  // Open/Close Modal
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // Handle Selection
  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const pageTitles = {
    "/admin/merchant/list": "Merchants",
    "/admin/merchant/followers": "Followers",
    "/admin/nudges":"Nudges",
    "/admin/merchant/details":`Merchants - ${getRestaurantName}`,
    "/admin/followerList/followerDetails":"Followers"
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
            <div className = "fs-24 fw-600">{pageTitles[location.pathname]}</div>
          )}
        </div>
        <div className="d-flex align-center gap-20">
          {/* <div className="notification">
          <img src={cartIcon} alt="icon" className="h-100" />
          <div className="sup">
            4
          </div>
        </div> */}
     <div className="d-flex selectCommon cursor-pointer align-center gap-6 " onClick={toggleModal}>
     <div  className="fs-16">
        {selectedItem ? `${selectedItem.name}` : 'Select Business'} 
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
         isOpen={isModalOpen} 
         onClose={toggleModal} 
         onSelect={handleSelect} 
         items={items} 
         selectedItem={selectedItem}
      />
    </>
  );
};

export default Header;
