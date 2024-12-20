import MerchantLogin from "../panels/merchant/auth/MerchantLogin";
import MerchantDashboard from "../panels/merchant/MerchantDashboard";

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
];

export default merchantRoutes;
