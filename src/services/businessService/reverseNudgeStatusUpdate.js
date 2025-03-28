import Http from "../http";

export const reverseNudgeStatusUpdateAPI = (data) => {
  return Http.post("business/nudge/reverse-nudge-status-update",data);
};


