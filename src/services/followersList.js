import Http from "./http";

export const followerListAPI = (data) => {
  return Http.post("admin/followers/list",data);
};
