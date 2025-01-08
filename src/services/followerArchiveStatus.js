import Http from "./http";

export const followerArchiveAPI = (data) => {
  return Http.post("admin/customer/status-update",data);
};


