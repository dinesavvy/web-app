import Http from "./http";

export const followerDetailsAPI = (data) => {
  return Http.post("admin/followers/details",data);
};


