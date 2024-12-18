import React, { useState, useEffect, useRef } from "react";
import "../../../assets/css/sidebar.css"

const Sidebar = ({isOpen}) => {
  

  return (
    <>
        <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
          <div className="logo" >

          </div>

          <div className="sidebar-position">
            
            <span>Home</span>
          </div>
          <div className="sidebar-position">
           
            <span>Menu item 2</span>
          </div>
          <div className="sidebar-position">
           
            <span>Menu item 3</span>
          </div>

          <div className="sidebar-position">
            
            <span>Position 4</span>
          </div>
        </div>
    </>
  );
};

export default Sidebar;
