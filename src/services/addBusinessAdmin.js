import Http from "./http";

export const addBusinessAdminAPI  = (data) => {
  return Http.post("admin/business-request/update",data);
};


