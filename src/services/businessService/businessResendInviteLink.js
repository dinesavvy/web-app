import Http from "../http";

export const businessResendInviteLinkAPI = (data) => {
  return Http.post("business/business-team/resend-invite-link",data);
};


