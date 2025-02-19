import Http from "./http";

export const removeDistributorAPI = (data) => {
  return Http.post("admin/distributor/remove",data);
};
