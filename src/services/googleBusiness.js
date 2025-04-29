import Http from "./http";

export const googleBusinessAPI = (fields, placeId, apiKey) => 
  Http.get(`https://maps.googleapis.com/maps/api/place/details/json?fields=${fields}&place_id=${placeId}&key=${apiKey}`);

