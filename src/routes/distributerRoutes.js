import DistributionDashboard from "./../panels/distributer/DistributionDashboard";
import Login from "./../panels/distributer/auth/Login";
const distributerRoutes = [
  {
    path: "/distributer/dashboard",
    element: DistributionDashboard,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/distributer",
    element: Login,
    isPrivate: false,
    isLayout: true,
  },
];

export default distributerRoutes;
