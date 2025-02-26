import Http from "../http";

export const removeSupplierAPI  = (data) => {
  return Http.post("supplier/brand/remove",data);
};


