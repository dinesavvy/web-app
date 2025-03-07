import Http from "../http";

export const updateSupplierBrandAPI  = (data) => {
  return Http.post("supplier/brand/update",data);
};


