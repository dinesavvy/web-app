import Http from "../http";

export const createDistributorPromotionAPI = (data) => {
  return Http.post("distributor/promotion/save", data);
};
