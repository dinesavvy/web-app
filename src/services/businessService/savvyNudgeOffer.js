import Http from "../http";

export const savvyNudgeOfferAPI = (data) => {
  return Http.post("business/savvy-nudge/list-by-merchantId",data);
};


