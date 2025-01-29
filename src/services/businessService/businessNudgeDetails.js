import Http from "../http";

export const businessNudgeDetailsAPI = (data) => {
  return Http.post("business/nudge/details",data);
};


