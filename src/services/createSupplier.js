import Http from "./http";

export const createSupplierAPI = (data) => {
  return Http.post("admin/supplier/save",data);
};


