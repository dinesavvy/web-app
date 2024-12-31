import Http from "./http";

export const loginAPI = (data) => {
  return Http.post("admin/session/login",data);
};
