import Http from "./http";

export const supportListAPI = (data) => {
  return Http.post("admin/business-request/list",data);
};
