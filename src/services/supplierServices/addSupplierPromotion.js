import Http from "../http";

export const addSupplierPromotionAPI  = (data) => {
  return Http.post("supplier/promotion/save",data);
};


