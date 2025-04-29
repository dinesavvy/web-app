import Http from "./http";

export const categoryListAPI = (data) => {
  return Http.post("admin/business-categories/list",data);
};


