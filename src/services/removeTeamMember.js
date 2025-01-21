import Http from "./http";

export const removeTeamMemberAPI = (data) => {
  return Http.post("business/business-team/remove",data);
};
