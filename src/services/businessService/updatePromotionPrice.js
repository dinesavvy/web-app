import Http from "../http";

export const updatePromotionPriceAPI = (data) => {
  return Http.post("business/promotion/update",data);
};


