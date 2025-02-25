import Http from "./http";

export const updateDistributorAPI = (data) => {
  return Http.post("admin/distributor/update",data);
};
