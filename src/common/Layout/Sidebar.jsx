import React from "react";
import "../../assets/css/sidebar.css";
import logo from "../../assets/images/logo.svg";
import logout from "../../assets/images/sidebar/logout.svg";
import dashboard from "../../assets/images/sidebar/dashboard.svg";
import dashboardFull from "../../assets/images/sidebar/dashboardFull.svg";
import merchant from "../../assets/images/sidebar/merchant.svg";
import merchantFull from "../../assets/images/sidebar/merchantFull.svg";
import consumers from "../../assets/images/sidebar/consumers.svg";
import consumersFull from "../../assets/images/sidebar/consumersFull.svg";
import nudge from "../../assets/images/sidebar/nudge.svg";
import nudgeFull from "../../assets/images/sidebar/nudgeFull.svg";
import promotions from "../../assets/images/sidebar/promotions.svg";
import promotionsFull from "../../assets/images/sidebar/promotionsFull.svg";
import brands from "../../assets/images/sidebar/brands.svg";
import brandsFull from "../../assets/images/sidebar/brandsFull.svg";
import setting from "../../assets/images/sidebar/setting.svg";
import settingFull from "../../assets/images/sidebar/settingFull.svg";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen ,setIsOpen}) => {
  
  const navigate = useNavigate()
  const links = [
    { id: 1, name: "Dashboard", icon: dashboard, iconFull: dashboardFull,navigate: "/admin/merchant/dashboard" },
    // { id: 2, name: "Suppliers", icon: suppliers, iconFull: suppliersFull },
    // {
    //   id: 3,
    //   name: "Distributors",
    //   icon: distributor,
    //   iconFull: distributorFull,
    // },
    { id: 4, name: "Merchants", icon: merchant, iconFull: merchantFull , navigate: "/admin/merchant/list",disabled:"" },
    { id: 5, name: "Followers", icon: consumers, iconFull: consumersFull, navigate: "/admin/merchant/followers",disabled:"" },
    { id: 6, name: "Nudges", icon: nudge, iconFull: nudgeFull,navigate: "/admin/nudges",disabled:"" },
    { id: 7, name: "Promotions", icon: promotions, iconFull: promotionsFull,disabled:true , tag:"19"} ,
    { id: 8, name: "Brands", icon: brands, iconFull: brandsFull,disabled:true},
    { id: 9, name: "Settings", icon: setting, iconFull: settingFull,disabled:true },
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
        <div className="sidebarLogo cursor-pointer" onClick={()=>navigate("/admin/merchant/dashboard")}>
          <img src={logo} alt="Logo" />
        </div>
        <div className="heightvh">
          <div>
            {links.map((link) => (
              <div
                key={link.id}
                className={`sidebarLink justify-between ${window.location.pathname === link.navigate ? "active" : ""} ${
                  isOpen ? "" : "tooltip-container"
                } ${link?.disabled ? "disabled" : ""}`}
                onClick={() => onNavigate(link.navigate)}
                data-tooltip-id={isOpen ? "sidebar-tooltip" : undefined}
                data-tooltip-content={isOpen ? link.name : undefined}
              >
                  <div className="d-flex align-center gap-15">
                  <img src={link.icon} alt={link.name} className="notSelected" />
                  <img src={link.iconFull} alt={link.name} className="selected" />
                <span>{link.name}</span>
                  </div>
                <div className="tagNumber fs-14 fw-500">
                  {link?.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="logout sidebarLink "
          data-tip={!isOpen ? "" : "Logout"}
          data-tooltip-id={isOpen ? "sidebar-tooltip" : undefined}
          data-tooltip-content={isOpen ? "Logout" : undefined}
          onClick={()=>{navigate("/");localStorage.clear()}}
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
