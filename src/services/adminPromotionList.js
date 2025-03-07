import Http from "./http";

export const adminPromotionListAPI  = (data) => {
  return Http.post("admin/promotion/list",data);
};


