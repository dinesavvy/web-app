import Http from "../http";

export const remvoeBrandSupplierAPI  = (data) => {
  return Http.post("supplier/brand/remove",data);
};


