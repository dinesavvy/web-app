import Http from "../http";

export const supplierEndPromotionAPI  = (data) => {
  return Http.post("supplier/promotion/remove",data);
};


