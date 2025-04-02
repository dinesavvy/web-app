import Http from "../http";

export const resetPasswordAPI  = (data) => {
  return Http.post("supplier/session/reset-password",data);
};


