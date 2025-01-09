import AdminLogin from "../../admin/auth/AdminLogin";
import MerchantList from "../Components/MerchantList";
import Followers from "../Components/Followers";
import Nudges from "../Components/Nudges";
import AdminDashboard from "../Components/AdminDashboard";
import MerchantDetails from "../Components/MerchantDetails";
import NudgeTemplate from "../Components/NudgeTemplate";
import FollowerDetail from "../Components/FollowerDetails";
import Promotions from "../Components/Promotions";
import Brands from "../Components/Brands";
import TeamMember from "../Components/TeamMember";
import EditMember from "../Components/EditMember";
import EditBrands from "../Components/EditBrands";

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
      path: "/admin/merchant/team-member",
      element: TeamMember,
      isPrivate: false,
      isLayout: true,
    },
    {
      path: "/admin/merchant/edit-member",
      element: EditMember,
      isPrivate: false,
      isLayout: true,
    },
    {
      path: "/admin/brands/edit",
      element: EditBrands,
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
    {
      path: "/admin/followerList/followerDetails",
      element: FollowerDetail,
      isPrivate: false,
      isLayout: true,
    },
    {
      path: "/admin/promotions",
      element: Promotions,
      isPrivate: false,
      isLayout: true,
    },
    {
      path: "/admin/brands",
      element: Brands,
      isPrivate: false,
      isLayout: true,
    },
];

export default adminRoutes;
