import AddBrandsDistributor from "../components/brands/AddBrandsDistributor";
import AddDistributorBrand from "../components/brands/AddDistributorBrand";
import BrandsListDistributor from "../components/brands/BrandList";
import AddDistributorPromotion from "../components/distributorPromotion/AddDistributorPromotion";
import DistributorPromotionList from "../components/distributorPromotion/distributorPromotionList";
import DistributorLogin from "../components/login/Login";
import DistributorDashboard from "./../components/distributorDashboard/DistributorDashboard";
import NoPageFound from "../../../common/noPageFound/NoPageFound";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ExpireLink from "../components/ForgotPassword/ExpireLink";
import ResetPassword from "../components/ForgotPassword/ResetPassword";


const supplierRoutes = [
  {
    path: "/",
    element: DistributorLogin,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/distributors/dashboard",
    element: DistributorDashboard,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/distributors/brands",
    element: BrandsListDistributor,
    isPrivate: false,
    isLayout: true,
  },

  {
    path: "/distributors/add-distributor-brands",
    element: AddBrandsDistributor,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/distributors/promotion",
    element: DistributorPromotionList,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/distributors/add-promotions",
    element: AddDistributorPromotion,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/distributors/forgot-password",
    element: ForgotPassword,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/distributors/expire-link",
    element: ExpireLink,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/distributors/reset-password/*",
    element: ResetPassword,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/distributors/new-password/*",
    element: ResetPassword,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/distributors/no-page-found",
    element: NoPageFound,
    isPrivate: false,
  },
  { path: '*', element: NoPageFound },
];

export default supplierRoutes;
