import Http from "../http";

export const topNudgesAPI = (id) => {
  return Http.get(`business/location/details/nudge/${id}`);
};


