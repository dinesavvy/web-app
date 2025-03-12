import Http from "../http";

export const distributorEndPromotionAPI = (data) => {
  return Http.post("distributor/promotion/remove", data);
};
