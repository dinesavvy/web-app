import DistributionDashboard from "../panels/distributer/DistributionDashboard";
import DistributorLogin from "../panels/distributer/auth/DistributorLogin";

const distributorRoutes = [
  {
    path: "/distributor/dashboard",
    element: DistributionDashboard,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/distributor",
    element: DistributorLogin,
    isPrivate: false,
    isLayout: true,
  },
];

export default distributorRoutes;
