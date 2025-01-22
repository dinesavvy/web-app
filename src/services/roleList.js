import Http from "./http";

export const roleListAPI = (data) => {
  return Http.post("admin/business-role/list",data);
};
