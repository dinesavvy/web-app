import Http from "../http";

export const supplierBrandListAPI  = (data) => {
  return Http.post("supplier/brand/list",data);
};


