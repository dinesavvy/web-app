import Login from "../../../shared/components/Login/Login";

const MerchantLogin = () => (
  <Login endPoint={"merchant.com"} route={"/merchant/dashboard"} />
);

export default MerchantLogin;
