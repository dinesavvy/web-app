import Http from "../http";

export const deleteDistributorBrandAPI = (data) => {
  return Http.post("distributor/brand/remove", data);
};
