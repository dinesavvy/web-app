import AddDistributorBrand from "../components/brands/AddDistributorBrand";
import BrandsListDistributor from "../components/brands/BrandList";
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
    element: AddDistributorBrand,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/distributors/promotions",
    // element: DistributorDashboard,
    isPrivate: false,
    isLayout: true,
  },
];

export default supplierRoutes;
