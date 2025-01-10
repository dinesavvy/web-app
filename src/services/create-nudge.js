import Http from "./http";

export const createNudgeAPI = (data) => {
  return Http.post("admin/nudge/add",data);
};


