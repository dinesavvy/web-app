import Http from "../http";

export const businessListAPI = (data) => {
  return Http.post("business/location/v2/list",data);
};


