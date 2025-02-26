import SuppliersLogin from "../components/login/Login"
import SupplierDashboard from "../components/supplierDashboard/SupplierDashboard";

const supplierRoutes = [
  {
    path: "/",
    element: SuppliersLogin,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/supplier/dashboard",
    element: SupplierDashboard,
    isPrivate: false,
    isLayout: false,
  },
];

export default supplierRoutes;
