import MerchantLogin from "../panels/merchant/auth/MerchantLogin";
import EditMember from "../panels/merchant/EditMember";
import FollowerDetail from "../panels/merchant/FollowerDetail";
import Followers from "../panels/merchant/Followers";
import MerchantDashboard from "../panels/merchant/MerchantDashboard";
import MerchantDetails from "../panels/merchant/MerchantDetails";
import MerchantList from "../panels/merchant/MerchantList";
import Nudges from "../panels/merchant/Nudges";
import TeamMember from "../panels/merchant/TeamMember";

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
  {
    path: "/merchant/team-member",
    element: TeamMember,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/merchant/edit-member",
    element: EditMember,
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
    path: "/merchant/followers/detail",
    element: FollowerDetail,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/merchant/nudges",
    element: Nudges,
    isPrivate: false,
    isLayout: true,
  },
];

export default merchantRoutes;
