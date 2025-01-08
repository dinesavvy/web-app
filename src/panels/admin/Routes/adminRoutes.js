import AdminLogin from "../../admin/auth/AdminLogin";
import MerchantList from "../Components/MerchantList";
import Followers from "../Components/Followers";
import Nudges from "../Components/Nudges";
import AdminDashboard from "../Components/AdminDashboard";
import MerchantDetails from "../Components/MerchantDetails";
import NudgeTemplate from "../Components/NudgeTemplate";

const adminRoutes = [
  {
    path: "/admin/merchant/dashboard",
    element: AdminDashboard,
    isPrivate: false,
    isLayout: true,
  },
  {
    element: AdminLogin,
    path: "/",
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
    {
      path: "/admin/nudges",
      element: Nudges,
      isPrivate: false,
      isLayout: true,
    },
    {
      path: "/admin/nudges/template",
      element: NudgeTemplate,
      isPrivate: false,
      isLayout: true,
    },
];

export default adminRoutes;
