import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const getAdminLogin = localStorage.getItem("adminLogin");
  const supplierLogin = localStorage.getItem("supplierLogin");
  const distributorLogin = localStorage.getItem("distributorLogin");
  const merchantLogin = localStorage.getItem("merchantLogin");

  const getToken = localStorage.getItem("token");

  const navigateToPage = () => {
    if (getAdminLogin && getToken) {
      navigate("/admin/dashboard");
    } else if (supplierLogin && getToken) {
      navigate("/supplier/dashboard");
    } else if (distributorLogin && getToken) {
      navigate("/distributors/dashboard");
    } else if (merchantLogin && getToken) {
      navigate("/merchant/dashboard");
    }
  };

  const navigateToLogin = () =>{
     if (!getToken) {
      navigate("/");
    } 
  }

  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <div className="error-box">
        <h2 className="error-title">This page doesn’t exist.</h2>
        <p className="error-message">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        {getToken ? (
        <button className="back-button" onClick={() => navigateToPage()}>
          ⬅ Back to Dashboard
        </button>
        ):(
          <button className="back-button" onClick={() => navigateToLogin()}>
          ⬅ Login
        </button>
        )}
      </div>
    </div>
  );
};

export default NotFound;
