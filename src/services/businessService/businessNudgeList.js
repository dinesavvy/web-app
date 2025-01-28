import Http from "../http";

export const businessNudgeListAPI = (data) => {
  return Http.post("business/nudge/list",data);
};


