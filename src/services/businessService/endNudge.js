import Http from "../http";

export const endNudgeAPI = (data) => {
  return Http.post("business/nudge/stop",data);
};


