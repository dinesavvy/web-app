import Http from "./http";

export const loyaltygraphAPI = (data) => {
  return Http.post("admin/dashboard/loyalty-analytic-details",data);
};
