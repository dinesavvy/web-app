import Http from "./http";

export const createSavvyNudgeAPI = (data) => {
  return Http.post("admin/savvy-nudge/add",data);
};


