import Http from "./http";

export const merchantListAPI = (data) => {
  return Http.post("admin/merchant/list",data);
};
