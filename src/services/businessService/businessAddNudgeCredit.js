import Http from "../http";

export const businessAddNudgeCreditAPI = (data) => {
  return Http.post("business/nudge/credit", data);
};
