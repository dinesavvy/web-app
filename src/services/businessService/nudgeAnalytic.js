import Http from "../http";

export const nudgeAnalyticAPI = (data) => {
  return Http.post("business/nudge/analytic",data);
};


