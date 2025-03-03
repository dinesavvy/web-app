import Http from "./http";

export const createPromotionAPI = (data) => {
  return Http.post("admin/promotion/save",data);
};


