import Http from "./http";

export const nudgeDetailsAPI = (data) => {
  return Http.post("admin/nudge/details",data);
};
