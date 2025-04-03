import Http from "../http";

export const checkResetPasswordLinkAPI  = (data) => {
  return Http.post("supplier/session/check-reset-password-token",data);
};


