import Http from "../http";

export const businessDashboardAPI = (data) => {
  return Http.post("business/dashboard/analytic-details",data);
};


