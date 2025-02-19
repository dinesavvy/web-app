import Http from "./http";

export const updateSupplierAPI = (data) => {
  return Http.post("admin/supplier/update",data);
};
