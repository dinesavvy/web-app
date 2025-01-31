import Http from "../http";

export const updateTeamBusinessAPI = (data) => {
  return Http.post("business/business-team/update",data);
};


