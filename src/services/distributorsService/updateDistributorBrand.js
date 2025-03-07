import Http from "../http";

export const updateDistributorBrandAPI = (data) => {
  return Http.post("distributor/brand/update", data);
};
