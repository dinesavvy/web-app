import AdminLogin from "../../admin/auth/AdminLogin";
import MerchantList from "../Components/MerchantList";
import Followers from "../Components/Followers";
import Nudges from "../Components/Nudges";
import AdminDashboard from "../Components/AdminDashboard";
import MerchantDetails from "../Components/MerchantDetails";
import NudgeTemplate from "../Components/NudgeTemplate";
import FollowerDetail from "../Components/FollowerDetails";
import Promotions from "../Components/Promotions";
import Brands from "../Components/Brands/Brands";
import TeamMember from "../Components/TeamMember";
import EditMember from "../Components/EditMember";
import EditBrands from "../Components/EditBrands";
import AddPromotion from "../Components/AddPromotion";
import MerchantGroupList from "../Components/MerchantGroupList";
import Suppliers from "../Components/Suppliers/Suppliers";
import Distributors from "../Components/Distributors/Distributors";
import AddBrands from "../Components/Brands/AddBrands";
import NoPageFound from "../../../common/noPageFound/NoPageFound";
import ForgotPassword from "../../suppliers/components/ForgotPassword/ForgotPassword";
import Support from "../Components/Support/Support";
import EditSupport from "../Components/Support/EditSupport";
import Settings from "../Components/Settings/Settings";
import SavvyNudge from "../Components/SavvyNudge/SavvyNudge";
import CreateSavvyNudge from "../Components/SavvyNudge/CreateSavvyNudge";


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
    path: "/admin/group/list",
    element: MerchantGroupList,
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
    path: "/admin/brands/add",
    element: AddBrands,
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
    path: "/admin/add-promotions",
    element: AddPromotion,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/admin/brands",
    element: Brands,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/admin/suppliers",
    element: Suppliers,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/admin/distributors",
    element: Distributors,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/admin/support",
    element: Support,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/admin/edit-support",
    element: EditSupport,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/admin/savvy-nudge",
    element: SavvyNudge,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/admin/create-savvy-nudge",
    element: CreateSavvyNudge,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/admin/settings",
    element: Settings,
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

export default adminRoutes;
