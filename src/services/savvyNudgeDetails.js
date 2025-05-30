import Http from "./http";

export const savvyNudgeDetailsAPI = (data) => {
  return Http.post("admin/savvy-nudge/details-by-nudgeId",data);
};
