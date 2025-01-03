import Http from "./http";

export const merchantDetailsAPI = (data) => {
  return Http.post("admin/merchant/details",data);
};
