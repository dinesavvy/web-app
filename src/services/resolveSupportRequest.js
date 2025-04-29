import Http from "./http";

export const resolveSupportRequestAPI = (data) => {
  return Http.post("admin/business-request/update",data);
};
