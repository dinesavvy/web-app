import AddBrandsDemo from "../components/brands/AddSupplierBrand";
// import AddBrandSupplier from "../components/brands/AddSupplierBrand";
import Brands from "../components/brands/BrandList";
// import EditBrandsSupplier from "../components/brands/EditBrand";
import SuppliersLogin from "../components/login/Login"
import AddSupplierPromotion from "../components/supplier/AddSupplierPromotion";
import SupplierPromotionList from "../components/supplier/supplierPromotionList";
import SupplierDashboard from "../components/supplierDashboard/SupplierDashboard";

const supplierRoutes = [
  {
    path: "/",
    element: SuppliersLogin,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/supplier/dashboard",
    element: SupplierDashboard,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/supplier/brands",
    element: Brands,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/supplier/addBrand",
    element: AddBrandsDemo,
    isPrivate: false,
    isLayout: true,
  },
  // {
  //   path: "/supplier/edit-brand",
  //   element: EditBrandsSupplier,
  //   isPrivate: false,
  //   isLayout: true,
  // },
  {
    path: "/supplier/promotion",
    element: SupplierPromotionList,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/supplier/add-promotions",
    element: AddSupplierPromotion,
    isPrivate: false,
    isLayout: true,
  },
];

export default supplierRoutes;
