import AddBrandSupplier from "../components/brands/AddSupplierBrand";
import Brands from "../components/brands/BrandList";
import EditBrandsSupplier from "../components/brands/EditBrand";
import SuppliersLogin from "../components/login/Login"
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
    element: AddBrandSupplier,
    isPrivate: false,
    isLayout: true,
  },
  {
    path: "/supplier/edit-brand",
    element: EditBrandsSupplier,
    isPrivate: false,
    isLayout: true,
  },
];

export default supplierRoutes;
