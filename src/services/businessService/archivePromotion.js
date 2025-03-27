import Http from "../http";

export const archivePromotionAPI = (data) => {
  return Http.post("business/promotion/list", data);
};
