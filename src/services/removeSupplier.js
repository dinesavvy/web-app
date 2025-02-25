import Http from "./http";

export const removeSupplierAPI = (data) => {
  return Http.post("admin/supplier/remove",data);
};
