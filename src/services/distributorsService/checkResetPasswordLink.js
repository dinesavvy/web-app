import Http from "../http";

export const checkResetPasswordLinkAPI = (data) => {
  return Http.post("distributor/session/check-reset-password-token", data);
};
