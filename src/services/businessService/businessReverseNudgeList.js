import Http from "../http";

export const businessReverseNudgeListAPI = (data) => {
  return Http.post("business/nudge/reverse-nudge-list",data);
};


