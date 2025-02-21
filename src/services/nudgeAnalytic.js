import Http from "./http";

export const nudgeAnalyticAPI = (data) => {
  return Http.post("admin/nudge/analytic",data);
};
