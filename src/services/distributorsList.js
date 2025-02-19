import Http from "./http";

export const distributorsListAPI = (data) => {
  return Http.post("admin/distributor/list",data);
};


