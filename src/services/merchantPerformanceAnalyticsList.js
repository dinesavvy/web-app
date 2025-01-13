import Http from "./http";

export const merchantPerformanceAnalyticsListAPI = (data) => {
  return Http.post("admin/dashboard/merchant-performance-analytic-list", data);
};
