import Http from "../http";

export const businessNudgesTemplateAPI = (data) => {
  return Http.post("business/nudge-template/list",data);
};


