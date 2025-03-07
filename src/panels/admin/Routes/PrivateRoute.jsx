/* eslint-disable react/prop-types */
import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children, redirectPath }) => {
  // return    <>{children}</>
  return localStorage.getItem("token") ? (
    <>{children}</>
  ) : (
    <Navigate to={"/"} />
  );
};

export default PrivateRoute;
  