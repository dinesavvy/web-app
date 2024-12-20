import Login from "../../../shared/components/Login/Login";

const AdminLogin = () => (
  <Login endPoint={"admin.com"} route={"/admin/dashboard"} />
);

export default AdminLogin;
