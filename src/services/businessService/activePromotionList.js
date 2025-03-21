import Http from "../http";

export const activePromotionListAPI = (data) => {
  return Http.post("business/promotion/active-promotion-list", data);
};
