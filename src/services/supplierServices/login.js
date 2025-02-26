import Http from "../http";

export const loginSupplierAPI  = (data) => {
  return Http.post("supplier/session/login",data);
};


