import Http from "../http";

export const followerDetailsAPI = (data) => {
  return Http.post("business/follower/details",data);
};


