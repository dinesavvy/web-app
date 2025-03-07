import AddBrandsDistributor from "../components/brands/AddBrandsDistributor";
import AddDistributorBrand from "../components/brands/AddDistributorBrand";
import BrandsListDistributor from "../components/brands/BrandList";
import AddDistributorPromotion from "../components/distributorPromotion/AddDistributorPromotion";
import DistributorPromotionList from "../components/distributorPromotion/distributorPromotionList";
import DistributorLogin from "../components/login/Login";
import DistributorDashboard from "./../components/distributorDashboard/DistributorDashboard";

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
];

export default supplierRoutes;
