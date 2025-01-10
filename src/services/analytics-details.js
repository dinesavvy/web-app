import Http from "./http";

export const analyticsDetailsAPI = (data) => {
  return Http.post("admin/dashboard/analytic-details",data);
};


