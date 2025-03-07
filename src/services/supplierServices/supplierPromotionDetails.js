import Http from "../http";

export const supplierPromotionDetailsAPI  = (data) => {
  return Http.post("supplier/promotion/details",data);
};


