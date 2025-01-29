import Http from "../http";

export const businessListByUserId = (data) => {
  return Http.post("business/nudge/list-by-userId",data);
};


