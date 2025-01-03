import Http from "./http";

export const nudgeListAPI = (data) => {
  return Http.post("admin/nudge/list",data);
};
