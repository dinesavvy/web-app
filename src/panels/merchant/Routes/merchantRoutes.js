import MerchantDashboard from "../merchantDashboard/MerchantDashboard";
import MerchantLogin from "../auth/MerchantLogin";
import RequestedCode from "../auth/RequestedCode";
import Followers from "../auth/Followers";
import ReverseNudge from "../auth/ReverseNudge";

const merchantRoutes = [
  {
    path: "/",
    element: MerchantLogin,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/requested-code",
    element: RequestedCode,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/merchant/dashboard",
    element: MerchantDashboard,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/merchant/followers",
    element: Followers,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/merchant/reverse-nudge",
    element: ReverseNudge,
    isPrivate: false,
    isLayout: true,
  },
];

export default merchantRoutes;
