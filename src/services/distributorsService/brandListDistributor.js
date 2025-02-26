import Http from "../http";

export const brandListDistributorAPI = (data) => {
  return Http.post("distributor/brand/list", data);
};
