import Http from "../http";

export const forgotPasswordSupplierAPI  = (data) => {
  return Http.post("supplier/session/forget-password",data);
};


