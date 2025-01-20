import Http from "./http";

export const teamsListAPI = (data) => {
  return Http.post("admin/business-team/list",data);
};
