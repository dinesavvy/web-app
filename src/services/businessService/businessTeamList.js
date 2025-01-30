import Http from "../http";

export const businessTeamListAPI = (data) => {
  return Http.post("business/business-team/list",data);
};


