import Http from "../http";

export const getBusinessTeamAPI = (data) => {
  return Http.post("business/business-team/details",data);
};


