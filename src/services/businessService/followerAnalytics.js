import Http from "../http";

export const followerAnalyticsAPI = (data) => {
  return Http.post("business/follower/analytic-details",data);
};


