import Http from "./http";

export const addCreditsAPI  = (data) => {
  return Http.post("admin/nudge/credit",data);
};


