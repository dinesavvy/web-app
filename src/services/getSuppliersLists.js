import Http from "./http";

export const getSupplierListAPI = (data) => {
  return Http.post("admin/supplier/list", data);
};
