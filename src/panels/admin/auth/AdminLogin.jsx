import React from "react";
import Login from "../../../common/Login/Login";

const AdminLogin = () => (
  <Login endPoint={"admin.com"} route={"/admin/dashboard"} />
);

export default AdminLogin;
