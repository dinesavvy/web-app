import Http from "../http";

export const nudgeRedeemedAPI = (data) => {
  return Http.post("business/nudge/nudge-redeem",data);
};


