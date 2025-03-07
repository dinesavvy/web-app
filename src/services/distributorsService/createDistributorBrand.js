import Http from "../http";

export const createDistributorBrandAPI = (data) => {
  return Http.post("distributor/brand/save", data);
};
