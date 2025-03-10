import MerchantDashboard from "../merchantDashboard/MerchantDashboard";
import MerchantLogin from "../auth/MerchantLogin";
import RequestedCode from "../auth/RequestedCode";
import Followers from "../auth/Followers";
import ReverseNudge from "../auth/ReverseNudge";
import Nudges from "../auth/Nudges";
import NudgeTemplateMerchant from "../auth/NudgeTemplateMerchant";
import Profile from "../auth/Profile";
import Hierarchy from "../auth/Hierarchy";
import NoPageFound from "../../../common/noPageFound/NoPageFound";

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
    path: "/merchant/create-nudge",
    element: NudgeTemplateMerchant,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/merchant/reverse-nudge",
    element: ReverseNudge,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/merchant/nudges",
    element: Nudges,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/merchant/profile",
    element: Profile,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/merchant/hierarchy",
    element: Hierarchy,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/admin/no-page-found",
    element: NoPageFound,
    isPrivate: false,
  },
  { path: '*', element: NoPageFound },
];

export default merchantRoutes;
