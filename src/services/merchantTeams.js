import Http from "./http";

export const merchantsTeamsAPI = (data) => {
  return Http.post("admin/business-team/list",data);
};
