import Http from "./http";

export const placeDetailsAPI = (data) => {
  return Http.post("admin/restaurant/place-details",data);
};
