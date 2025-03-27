import Http from "../http";

export const getProfileAPI = (id) => {
  return Http.get(`business/location/details/${id}`);
};


