import Http from "./http";

export const savvyNudgesListAPI = (data) => {
  return Http.post("admin/savvy-nudge/list",data);
};
