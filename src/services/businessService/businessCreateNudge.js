import Http from "../http";

export const businessCreateNudgeAPI = (data) => {
  return Http.post("business/nudge/add",data);
};


