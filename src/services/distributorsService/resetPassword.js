import Http from "../http";

export const resetPasswordDistributorAPI = (data) => {
  return Http.post("distributor/session/reset-password", data);
};
