import AdminLogin from "./../panels/admin/auth/AdminLogin";
import AdminDashboard from "./../panels/admin/AdminDashboard";
const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: AdminDashboard,
    isPrivate: false,
    isLayout: true,
  },
  {
    element: AdminLogin,
    path: "/admin",
    isPrivate: false,
    isLayout: false,
  },
];

export default adminRoutes;
