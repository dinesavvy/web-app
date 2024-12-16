/* eslint-disable react/prop-types */
import { Navigate } from "react-router";

const PrivateRoute = ({ children, redirectPath }) => {
  // return    <>{children}</>
  return localStorage.getItem("token") ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectPath || "/"} />
  );
};

export default PrivateRoute;
