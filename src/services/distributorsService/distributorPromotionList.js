import Http from "../http";

export const distributorPromotionListAPI = (data) => {
  return Http.post("distributor/promotion/list", data);
};
