import Http from "../http";

export const supplierPromotionListAPI  = (data) => {
  return Http.post("supplier/promotion/list",data);
};


