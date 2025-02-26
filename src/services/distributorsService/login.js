import Http from "../http";

export const loginAPI = (data) => {
  return Http.post("distributor/session/login", data);
};
