import React, { useEffect, useState } from "react";
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
// import promotion from "../../assets/images/sidebar/promotion.svg"
// import promotionFull from "../../assets/images/sidebar/promotionFull.svg"
import promotions from "../../assets/images/sidebar/promotions.svg";
import promotionsFull from "../../assets/images/sidebar/promotionsFull.svg";
import brands from "../../assets/images/sidebar/brands.svg";
import brandsFull from "../../assets/images/sidebar/brandsFull.svg";
import settings from "../../assets/images/sidebar/setting.svg";
import settingsFull from "../../assets/images/sidebar/settingFull.svg";
import suppliers from "../../assets/images/sidebar/suppliers.svg";
import suppliersFull from "../../assets/images/sidebar/suppliersFull.svg";
import distributor from "../../assets/images/sidebar/distributor.svg";
import distributorFull from "../../assets/images/sidebar/distributorFull.svg";
import profile from "../../assets/images/sidebar/profile.svg";
import profileFull from "../../assets/images/sidebar/profileFull.svg";
import hierarchy from "../../assets/images/sidebar/hierarchy.svg";
import hierarchyFull from "../../assets/images/sidebar/hierarchyFull.svg";
import support from "../../assets/images/sidebar/support.svg";
import supportFull from "../../assets/images/sidebar/supportFull.svg";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import CommonModal from "../../panels/admin/Components/CommonModal";
import { supportListHandler } from "../../redux/action/supportList";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getLoggedInDetails = localStorage.getItem("merchantLogin");
  const getSupplierDetails = localStorage.getItem("supplierLogin");
  const getDistributorLoginDetails = localStorage.getItem("distributorLogin");

  // useEffect(() => {
  //   // if (activeTab) {
  //     let payload = {
  //       page: 1,
  //       limit: 20,
  //       status: "Active", // Completed , Rejected, Pending
  //     };
  //     dispatch(supportListHandler(payload));
  //   // }
  // }, []);

  // const supportListSelector = useSelector((state)=>state?.supportList)

  const links =
    getSupplierDetails || getDistributorLoginDetails
      ? [
          {
            id: 7,
            name: "Dashboard",
            icon: dashboard,
            iconFull: dashboardFull,
            disabled: false,
            navigate: getSupplierDetails
              ? "/supplier/dashboard"
              : "/distributors/dashboard",
          },
          {
            id: 8,
            name: "Brands",
            icon: brands,
            iconFull: brandsFull,
            disabled: false,
            navigate: getSupplierDetails
              ? "/supplier/brands"
              : "/distributors/brands",
          },
          {
            id: 7,
            name: "Promotions",
            icon: promotions,
            iconFull: promotionsFull,
            disabled: false,
            // tag: "19",
            navigate: getSupplierDetails
              ? "/supplier/promotion"
              : "/distributors/promotion",
          },
        ]
      : [
          {
            id: 1,
            name: "Dashboard",
            icon: dashboard,
            iconFull: dashboardFull,
            navigate: getLoggedInDetails
              ? "/merchant/dashboard"
              : "/admin/dashboard",
          },
          ...(getLoggedInDetails
            ? []
            : [
                {
                  id: 2,
                  name: "Suppliers",
                  icon: suppliers,
                  iconFull: suppliersFull,
                  navigate: "/admin/suppliers",
                },
                {
                  id: 3,
                  name: "Distributors",
                  icon: distributor,
                  iconFull: distributorFull,
                  navigate: "/admin/distributors",
                },
              ]),
          ...(getLoggedInDetails
            ? []
            : [
                {
                  id: 4,
                  name: "Merchants",
                  icon: merchant,
                  iconFull: merchantFull,
                  navigate: "/admin/merchant/list",
                  disabled: "",
                },
              ]),
          {
            id: 5,
            name: "Followers",
            icon: consumers,
            iconFull: consumersFull,
            navigate: getLoggedInDetails
              ? "/merchant/followers"
              : "/admin/followers",
            disabled: "",
          },
          {
            id: 6,
            name: "Nudges",
            icon: nudge,
            iconFull: nudgeFull,
            navigate: getLoggedInDetails ? "/merchant/nudges" : "/admin/nudges",
            disabled: "",
          },
          {
            id: 14,
            name: "Savvy Nudges",
            icon: nudge,
            iconFull: nudgeFull,
            navigate:getLoggedInDetails ?  "/merchant/savvy-nudge" :"/admin/savvy-nudge",
            disabled: "",
            // tag: 9,
          },
          // {
          //   id: 6,
          //   name: "Promotions",
          //   icon: promotions,
          //   iconFull: promotionsFull,
          //   // navigate: getLoggedInDetails ? "/merchant/promotion" : "/admin/nudges",
          //   navigate: "/merchant/promotions",
          //   disabled: "",
          // },
          ...(getLoggedInDetails
            ? [
                {
                  id: 10,
                  name: "Profile",
                  icon: profile,
                  iconFull: profileFull,
                  navigate: "/merchant/profile",
                },
                {
                  id: 11,
                  name: "Team",
                  icon: hierarchy,
                  iconFull: hierarchyFull,
                  navigate: "/merchant/hierarchy",
                },
              ]
            : [
                {
                  id: 7,
                  name: "Promotions",
                  icon: promotions,
                  iconFull: promotionsFull,
                  disabled: false,
                  // tag: "19",
                  navigate: "/admin/promotions",
                },
                {
                  id: 8,
                  name: "Brands",
                  icon: brands,
                  iconFull: brandsFull,
                  disabled: false,
                  navigate: "/admin/brands",
                },
                {
                  id: 12,
                  name: "Support",
                  icon: support,
                  iconFull: supportFull,
                  navigate: "/admin/support",
                  disabled: "",
                  // tag: 9,
                },
                {
                  id: 13,
                  name: "Settings",
                  icon: settings,
                  iconFull: settingsFull,
                  navigate: "/admin/settings",
                  disabled: "",
                  // tag: 9,
                },
              ]),
        ];

  const onNavigate = (path) => {
    const width = window.innerWidth;
    navigate(path);
    if (width <= 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        className={isOpen ? "overlay " : "overlay close"}
        onClick={() => setIsOpen(false)}
      ></div>
      <div className={`sidebar ${isOpen ? "sidebarOpen" : ""}`}>
        <div
          className="sidebarLogo cursor-pointer"
          onClick={() => {
            getLoggedInDetails
              ? navigate("/merchant/dashboard")
              : navigate("/admin/dashboard");
          }}
        >
          <img src={logo} alt="Logo" />
        </div>
        <div className="heightvh">
          <div>
            {links.map((link) => (
              <div
                key={link.id}
                className={`sidebarLink align-center justify-between ${
                  window.location.pathname === link.navigate ? "active" : ""
                } ${isOpen ? "" : "tooltip-container"} ${
                  link?.disabled ? "disabled" : ""
                }`}
                onClick={() => {
                    localStorage.removeItem("nudgeQuantity");
                  onNavigate(link.navigate);
                }}
                data-tooltip-id={isOpen ? "sidebar-tooltip" : undefined}
                data-tooltip-content={isOpen ? link.name : undefined}
              >
                <div className="d-flex align-center gap-15">
                  <img
                    src={link.icon}
                    alt={link.name}
                    className="notSelected"
                  />
                  <img
                    src={link.iconFull}
                    alt={link.name}
                    className="selected"
                  />
                  <span>{link.name}</span>
                </div>
                {link?.tag && (
                  <div className="tagNumber fs-14 fw-500 tagcolor">
                    {link?.tag}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          className="logout sidebarLink "
          data-tip={!isOpen ? "" : "Logout"}
          data-tooltip-id={isOpen ? "sidebar-tooltip" : undefined}
          data-tooltip-content={isOpen ? "Logout" : undefined}
          onClick={() => {
            // navigate("/");
            // localStorage.clear();
            setShowLogoutModal(true);
          }}
        >
          <img src={logout} alt="Logout" />
          <span>Logout</span>
        </div>
        <Tooltip id="sidebar-tooltip" place="right" />
      </div>
      {showLogoutModal && (
        <CommonModal
          modal2Open={showLogoutModal}
          showLogoutModal={showLogoutModal}
          setModal2Open={setShowLogoutModal}
        />
      )}
    </>
  );
};

export default Sidebar;
