import Http from "../http";

export const loyaltyGraphAPI = (data) => {
  return Http.post("business/dashboard/loyalty-analytic-details",data);
};


