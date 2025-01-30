import Http from "../http";

export const businessRoleUpdate = (data) => {
  return Http.post("business/business-role/update",data);
};


