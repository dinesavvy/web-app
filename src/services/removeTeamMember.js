import Http from "./http";

export const removeTeamMemberAPI = (data) => {
  return Http.post("admin/business-team/remove",data);
};
