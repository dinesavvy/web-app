import Http from "./http";

export const merchantPerformanceAnalyticsDetailsAPI = (data) => {
  return Http.post("admin/dashboard/merchant-performance-analytic-details", data);
};
