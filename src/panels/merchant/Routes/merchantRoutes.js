import MerchantLogin from "../auth/MerchantLogin";

const merchantRoutes = [
  {
    path: "/",
    element: MerchantLogin,
    isPrivate: false,
    isLayout: false,
  },
];

export default merchantRoutes;
