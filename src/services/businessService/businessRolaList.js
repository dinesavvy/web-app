import Http from "../http";

export const businessRoleListAPI = (data) => {
  return Http.post("business/business-role/list",data);
};


