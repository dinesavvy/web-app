import Login from "./../panels/admin/auth/Login";
import AdminDashboard from "./../panels/admin/AdminDashboard";
const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: AdminDashboard,
    isPrivate: false,
    isLayout: true,
  },
  {
    element: Login,
    path: "/admin",
    isPrivate: false,
    isLayout: true,
  },
];

export default adminRoutes;
