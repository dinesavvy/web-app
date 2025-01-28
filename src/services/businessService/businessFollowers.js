import Http from "../http";

export const businessFollowersAPI = (data) => {
  return Http.post("business/follower/list",data);
};


