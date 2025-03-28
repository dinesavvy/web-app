import Http from "../http";

export const reverseNudgeDetailsAPI = (data) => {
  return Http.post("business/nudge/reverse-nudge-details",data);
};


