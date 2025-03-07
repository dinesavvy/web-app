import Http from "../http";

export const addSuppplierBrandAPI  = (data) => {
  return Http.post("supplier/brand/save",data);
};


