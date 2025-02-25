import Http from "./http";

export const createDistributorAPI = (data) => {
  return Http.post("admin/distributor/save",data);
};


