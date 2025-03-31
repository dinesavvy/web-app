import Http from "../http";

export const forgotPasswordAPI = (data) => {
  return Http.post("distributor/session/forget-password",data);
};


