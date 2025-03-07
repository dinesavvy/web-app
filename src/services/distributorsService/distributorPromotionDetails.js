import Http from "../http";

export const distributorPromotionDetailsAPI = (data) => {
  return Http.post("distributor/promotion/details", data);
};
