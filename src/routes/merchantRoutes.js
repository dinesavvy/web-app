import MerchantLogin from "../panels/merchant/auth/MerchantLogin";
import MerchantDashboard from "../panels/merchant/MerchantDashboard";
import MerchantDetails from "../panels/merchant/MerchantDetails";
import MerchantList from "../panels/merchant/MerchantList";

const merchantRoutes = [
  {
    path: "/merchant/dashboard",
    element: MerchantDashboard,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/merchant",
    element: MerchantLogin,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/merchant/list",
    element: MerchantList,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/merchant/details",
    element: MerchantDetails,
    isPrivate: false,
    isLayout: true,
  },
];

export default merchantRoutes;
