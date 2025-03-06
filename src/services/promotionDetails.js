import Http from "./http";

export const promotionDetailsAPI = (data) => {
  return Http.post("admin/promotion/details",data);
};
