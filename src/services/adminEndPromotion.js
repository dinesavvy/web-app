import Http from "./http";

export const adminEndPromotionAPI  = (data) => {
  return Http.post("admin/promotion/remove",data);
};


