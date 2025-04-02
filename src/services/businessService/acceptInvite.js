import Http from "../http";

export const acceptInviteAPI = (data) => {
  return Http.post("business/business-team/accept-invite", data);
};
