import Http from "../http";

export const loginDistributorAPI = (data) => {
  return Http.post("distributor/session/login", data);
};
