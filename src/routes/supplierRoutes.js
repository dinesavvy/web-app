import SupplierLogin from "../panels/supplier/auth/SupplierLogin";
import SupplierDashboard from "../panels/supplier/SupplierDashboard";

const supplierRoutes = [
  {
    path: "/supplier/dashboard",
    element: SupplierDashboard,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/supplier",
    element: SupplierLogin,
    isPrivate: false,
    isLayout: false,
  },
];

export default supplierRoutes;
