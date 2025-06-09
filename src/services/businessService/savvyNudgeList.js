import Http from "../http";

export const savvyNudgeListAPI = (data) => {
  return Http.post("business/savvy-nudge/list",data);
};


