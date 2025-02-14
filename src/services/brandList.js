import Http from "./http";

export const brandListAPI = (data) => {
  return Http.post("admin/brand/list",data);
};


