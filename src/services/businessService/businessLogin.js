import Http from "../http";

export const businessLoginAPI = (data) => {
  return Http.post("business/login",data);
};


