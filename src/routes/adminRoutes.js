import AdminLogin from "./../panels/admin/auth/AdminLogin";
import AdminDashboard from "./../panels/admin/AdminDashboard";
import MerchantList from "../panels/merchant/MerchantList";
import Followers from "../panels/merchant/Followers";
import MerchantDetails from "../panels/merchant/MerchantDetails";
const adminRoutes = [
  {
    path: "/admin/merchant/dashboard",
    element: AdminDashboard,
    isPrivate: false,
    isLayout: true,
  },
  {
    element: AdminLogin,
    path: "/admin",
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/admin/merchant/list",
    element: MerchantList,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/admin/merchant/followers",
    element: Followers,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/admin/merchant/details",
    element: MerchantDetails,
    isPrivate: false,
    isLayout: true,
  },
];

export default adminRoutes;
