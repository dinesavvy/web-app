import DistributorLogin from "../components/login/Login";
import DistributorDashboard from "./../components/distributorDashboard/DistributorDashboard";

const supplierRoutes = [
  {
    path: "/",
    element: DistributorLogin,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/distributors/dashboard",
    element: DistributorDashboard,
    isPrivate: false,
    isLayout: true,
  },
];

export default supplierRoutes;
