import Http from "../http";

export const createTeamAPI = (data) => {
  return Http.post("business/business-team/save",data);
};


