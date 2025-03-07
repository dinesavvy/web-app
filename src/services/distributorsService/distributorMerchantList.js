import Http from "../http";

export const distributorMerchantListAPI = (data) => {
  return Http.post("distributor/merchant/list", data);
};
