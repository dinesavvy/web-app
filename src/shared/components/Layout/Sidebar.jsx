import React from "react";
import "../../../assets/css/sidebar.css";
import logo from "../../../assets/images/logo.svg";
import logout from "../../../assets/images/sidebar/logout.svg";
import dashboard from "../../../assets/images/sidebar/dashboard.svg";
import dashboardFull from "../../../assets/images/sidebar/dashboardFull.svg";
import suppliers from "../../../assets/images/sidebar/suppliers.svg";
import suppliersFull from "../../../assets/images/sidebar/suppliersFull.svg";
import distributor from "../../../assets/images/sidebar/distributor.svg";
import distributorFull from "../../../assets/images/sidebar/distributorFull.svg";
import merchant from "../../../assets/images/sidebar/merchant.svg";
import merchantFull from "../../../assets/images/sidebar/merchantFull.svg";
import consumers from "../../../assets/images/sidebar/consumers.svg";
import consumersFull from "../../../assets/images/sidebar/consumersFull.svg";
import nudge from "../../../assets/images/sidebar/nudge.svg";
import nudgeFull from "../../../assets/images/sidebar/nudgeFull.svg";
import promotions from "../../../assets/images/sidebar/promotions.svg";
import promotionsFull from "../../../assets/images/sidebar/promotionsFull.svg";
import brands from "../../../assets/images/sidebar/brands.svg";
import brandsFull from "../../../assets/images/sidebar/brandsFull.svg";
import setting from "../../../assets/images/sidebar/setting.svg";
import settingFull from "../../../assets/images/sidebar/settingFull.svg";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Item from "antd/es/list/Item";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen ,setIsOpen}) => {
  
  const navigate = useNavigate()
  const links = [
    { id: 1, name: "Dashboard", icon: dashboard, iconFull: dashboardFull },
    // { id: 2, name: "Suppliers", icon: suppliers, iconFull: suppliersFull },
    // {
    //   id: 3,
    //   name: "Distributors",
    //   icon: distributor,
    //   iconFull: distributorFull,
    // },
    { id: 4, name: "Merchants", icon: merchant, iconFull: merchantFull , navigate: "/merchant/list" },
    { id: 5, name: "Followers", icon: consumers, iconFull: consumersFull, navigate: "/merchant/followers" },
    { id: 6, name: "Nudges", icon: nudge, iconFull: nudgeFull },
    { id: 7, name: "Promotions", icon: promotions, iconFull: promotionsFull },
    { id: 8, name: "Brands", icon: brands, iconFull: brandsFull },
    { id: 9, name: "Settings", icon: setting, iconFull: settingFull },
  ];

  const onNavigate=(path)=>{
    const width = window.innerWidth;
    navigate(path)

    if (width <= 1024) {
      setIsOpen(false)
    }
  }

  return (
    <>
    <div className={isOpen ? "overlay ": "overlay close"} onClick={()=>setIsOpen(false)}></div>
      <div className={`sidebar ${isOpen ? "sidebarOpen" : ""}`}>
        <div className="sidebarLogo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="heightvh">
          <div>
            {links.map((link) => (
              <div
                key={link.id}
                className={`sidebarLink  ${window.location.pathname == link.navigate ? "active" : ""}  ${
                  isOpen ? "" : "tooltip-container"
                }`}
                onClick={() => onNavigate(link.navigate)}
                data-tooltip-id={isOpen ? "sidebar-tooltip" : undefined}
                data-tooltip-content={isOpen ? link.name : undefined}
              >
                <img src={link.icon} alt={link.name} className="notSelected" />
                <img src={link.iconFull} alt={link.name} className="selected" />
                <span>{link.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="logout sidebarLink "
          data-tip={!isOpen ? "" : "Logout"}
          data-tooltip-id={isOpen ? "sidebar-tooltip" : undefined}
          data-tooltip-content={isOpen ? "Logout" : undefined}
          onClick={()=>{navigate("/admin");localStorage.clear()}}
        >
          <img src={logout} alt="Logout" />
           <span>Logout</span>
        </div>
        <Tooltip id="sidebar-tooltip" place="right" />
      </div>
      
    </>
  );
};

export default Sidebar;
