import Http from "./http";

export const updateTeamAPI = (data) => {
  return Http.post("admin/business-team/update",data);
};
