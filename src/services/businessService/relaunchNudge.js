import Http from "../http";

export const relaunchNudgeAPI = (data) => {
  return Http.post("business/nudge/relaunch",data);
};


